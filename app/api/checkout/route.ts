import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PACKAGES: Record<string, { priceId: string; setupFee: number; name: string }> = {
  gbp: {
    priceId: "price_1Toi1MDrg0mwRnvZJakNO5sB",
    setupFee: 12900,
    name: "Google Maps Visibility",
  },
  web: {
    priceId: "price_1Toi26Drg0mwRnvZc4Lo1Gkn",
    setupFee: 29900,
    name: "Website & Hosting",
  },
  full: {
    priceId: "price_1Toi2VDrg0mwRnvZxcTqzDp7",
    setupFee: 39900,
    name: "Full Online Presence",
  },
};

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
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${pkg.name} — Setup Fee` },
          unit_amount: pkg.setupFee,
        },
        quantity: 1,
      },
    ],

    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/services`,
  });

  return NextResponse.json({ url: session.url });
}
