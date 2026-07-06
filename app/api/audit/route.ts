import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const { businessName, address, email } = await req.json();

  if (
    typeof businessName !== "string" || !businessName.trim() ||
    typeof address !== "string" || !address.trim() ||
    typeof email !== "string" || !email.trim()
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await resend.emails.send({
    from: "Studio Rocinante <hello@studiorocinante.com>",
    to: "hello@studiorocinante.com",
    replyTo: email,
    subject: `Free audit request — ${businessName}`,
    html: `<p><strong>Business:</strong> ${escapeHtml(businessName)}</p><p><strong>Address:</strong> ${escapeHtml(address)}</p><p><strong>Contact email:</strong> ${escapeHtml(email)}</p>`,
  });

  await resend.emails.send({
    from: "Studio Rocinante <hello@studiorocinante.com>",
    replyTo: "hello@studiorocinante.com",
    to: email,
    subject: "Studio Rocinante — Your free audit is on the way",
    html: confirmationEmail(businessName),
  });

  return NextResponse.json({ ok: true });
}

function confirmationEmail(businessName: string): string {
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
                Thanks for requesting a free audit for <strong>${escapeHtml(businessName)}</strong>.
              </p>

              <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:15px;color:#4a4338;line-height:1.6;">
                We'll check your Google listing, directories, and everything else affecting how you show up online, then send the results here within 2 business days.
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
