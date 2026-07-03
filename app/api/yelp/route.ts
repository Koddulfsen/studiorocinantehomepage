import { NextRequest, NextResponse } from "next/server";

const YELP_KEY = process.env.YELP_API_KEY;

export async function GET(req: NextRequest) {
  if (!YELP_KEY) {
    return NextResponse.json({ error: "Yelp API key not configured" }, { status: 503 });
  }

  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const address = searchParams.get("address");
  const city = searchParams.get("city");

  if (!name || !city) {
    return NextResponse.json({ error: "Missing name or city" }, { status: 400 });
  }

  const params = new URLSearchParams({
    name,
    ...(address ? { address1: address } : {}),
    city,
    country: "CA",
    limit: "1",
  });

  const res = await fetch(
    `https://api.yelp.com/v3/businesses/matches?${params}`,
    { headers: { Authorization: `Bearer ${YELP_KEY}` } }
  );

  if (!res.ok) return NextResponse.json({ found: false });

  const data = await res.json();
  const biz = data.businesses?.[0];

  if (!biz) return NextResponse.json({ found: false });

  return NextResponse.json({
    found: true,
    name: biz.name,
    phone: biz.phone,
    address: biz.location?.address1,
    city: biz.location?.city,
    url: biz.url,
  });
}
