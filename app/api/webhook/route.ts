import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { PACKAGE_NAMES_BY_PRICE_ID } from "@/lib/packages";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

// Dedup relies on Resend's idempotencyKey (below), which is durable across
// retries/instances — this in-memory set is just a fast-path short-circuit.
const processedEvents = new Set<string>();

async function sendEmail(params: Parameters<typeof resend.emails.send>[0], idempotencyKey: string) {
  try {
    await resend.emails.send(params, { idempotencyKey });
  } catch (err) {
    // Don't let an email failure make us return non-200 to Stripe — that
    // would trigger a full webhook retry rather than just an email retry.
    console.error(`Failed to send email (idempotencyKey=${idempotencyKey}):`, err);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency guard — skip already-processed events
  if (processedEvents.has(event.id)) {
    console.log(`Skipping duplicate event ${event.id}`);
    return NextResponse.json({ received: true });
  }
  processedEvents.add(event.id);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    if (customerEmail) {
      let packageName = "your package";
      try {
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ["line_items"],
        });
        const priceId = fullSession.line_items?.data?.find(
          (li) => li.price?.recurring
        )?.price?.id;
        if (priceId && PACKAGE_NAMES_BY_PRICE_ID[priceId]) packageName = PACKAGE_NAMES_BY_PRICE_ID[priceId];
      } catch {
        console.error("Could not retrieve line items for session", session.id);
      }

      await sendEmail(
        {
          from: "Studio Rocinante <hello@studiorocinante.com>",
          replyTo: "hello@studiorocinante.com",
          to: customerEmail,
          subject: "Studio Rocinante — Let's get started",
          html: welcomeEmail(packageName),
        },
        `welcome-${event.id}`
      );

      console.log(`Welcome email sent to ${customerEmail} (${packageName})`);
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice;
    const customerEmail = invoice.customer_email;
    const attemptCount = invoice.attempt_count;
    const givingUp = !invoice.next_payment_attempt;

    await sendEmail(
      {
        from: "Studio Rocinante <hello@studiorocinante.com>",
        to: "hello@studiorocinante.com",
        subject: `Payment failed — ${customerEmail}`,
        html: `<p>Payment attempt ${attemptCount} failed for <strong>${customerEmail}</strong>.</p>${givingUp ? "<p><strong>Stripe has stopped retrying. Manual follow-up needed.</strong></p>" : "<p>Stripe will retry automatically.</p>"}`,
      },
      `payment-failed-${event.id}`
    );
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = sub.customer as string;

    let customerEmail = "unknown";
    try {
      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
      customerEmail = customer.email ?? "unknown";
    } catch { /* ignore */ }

    await sendEmail(
      {
        from: "Studio Rocinante <hello@studiorocinante.com>",
        to: "hello@studiorocinante.com",
        subject: `Subscription cancelled — ${customerEmail}`,
        html: `<p>Subscription cancelled for <strong>${customerEmail}</strong>.</p><p>Subscription ID: ${sub.id}</p>`,
      },
      `subscription-deleted-${event.id}`
    );
  }

  return NextResponse.json({ received: true });
}

function welcomeEmail(packageName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f7f1e6;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 32px 0;">
              <p style="margin:0;font-family:Georgia,serif;font-size:17px;font-weight:600;color:#1c1813;letter-spacing:-0.3px;">
                Studio Rocinante
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#fff8ee;border:1px solid #e8ddc8;border-radius:8px;padding:36px 40px;">

              <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;color:#4a4338;line-height:1.6;">
                Hi,
              </p>

              <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;color:#1c1813;line-height:1.6;">
                Welcome aboard.
              </p>

              <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:15px;color:#4a4338;line-height:1.6;">
                First thing on my end is an audit of your online presence — I'll check your Google listing, directories, and everything relevant to your ${packageName} package. To find you on Google I just need one thing:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f7f1e6;border-left:3px solid #b9701a;padding:14px 18px;border-radius:0 6px 6px 0;margin:24px 0;display:block;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;font-weight:600;color:#1c1813;">
                      What's your business name and address?
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:20px 0 28px;font-family:Arial,sans-serif;font-size:15px;color:#4a4338;line-height:1.6;">
                Reply here and I'll take it from there. Back to you within 2 business days.
              </p>

              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#4a4338;line-height:1.8;">
                Speak soon,<br/>
                <span style="color:#1c1813;font-weight:600;">Jens</span><br/>
                <span style="font-size:13px;color:#b9701a;">Studio Rocinante</span>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-family:monospace;font-size:11px;color:#9a8f82;letter-spacing:0.05em;">
                © 2026 Studio Rocinante
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
