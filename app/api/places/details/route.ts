import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_KEY!;

const FIELDS = [
  "id",
  "displayName",
  "formattedAddress",
  "nationalPhoneNumber",
  "websiteUri",
  "regularOpeningHours",
  "rating",
  "userRatingCount",
  "photos",
  "types",
  "primaryType",
  "reviews",
  "businessStatus",
  "location",
  "editorialSummary",
  // Attributes (Places API v1)
  "outdoorSeating",
  "delivery",
  "dineIn",
  "takeout",
  "reservable",
  "servesBeer",
  "servesWine",
  "servesBrunch",
  "servesVegetarianFood",
  "wheelchairAccessibleEntrance",
  "goodForChildren",
  "goodForGroups",
  "liveMusic",
  "menuForChildren",
  "servesCocktails",
  "servesDessert",
  "servesCoffee",
].join(",");

export async function GET(req: NextRequest) {
  const placeId = req.nextUrl.searchParams.get("placeId");
  if (!placeId) return NextResponse.json({ error: "Missing placeId" }, { status: 400 });

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=en`,
    {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": FIELDS,
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
