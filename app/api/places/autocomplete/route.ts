import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_KEY!;

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) return NextResponse.json({ suggestions: [] });

  const res = await fetch(
    "https://places.googleapis.com/v1/places:autocomplete",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
      },
      body: JSON.stringify({
        input: q,
        includedPrimaryTypes: ["establishment"],
        languageCode: "en",
      }),
    }
  );

  if (!res.ok) return NextResponse.json({ suggestions: [] }, { status: res.status });

  const data = await res.json();

  const suggestions = (data.suggestions ?? []).map((s: any) => ({
    placeId: s.placePrediction?.placeId,
    text: s.placePrediction?.text?.text,
    mainText: s.placePrediction?.structuredFormat?.mainText?.text,
    secondaryText: s.placePrediction?.structuredFormat?.secondaryText?.text,
  })).filter((s: any) => s.placeId && s.text);

  return NextResponse.json({ suggestions });
}
