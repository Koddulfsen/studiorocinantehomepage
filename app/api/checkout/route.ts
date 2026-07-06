import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { PACKAGES } from "@/lib/packages";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { packageId } = await req.json();

  const pkg = PACKAGES[packageId];
  if (!pkg) {
    return NextResponse.json({ error: "Invalid package" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "https://studiorocinante.com";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: pkg.priceId,
        quantity: 1,
      },
    ],

    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/services`,
  });

  return NextResponse.json({ url: session.url });
}
