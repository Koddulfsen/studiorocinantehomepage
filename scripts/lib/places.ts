import { API_KEY, RADIUS } from "../config";

export interface PlaceResult {
  place_id: string;
  name: string;
  vicinity: string;
  business_status: string;
  types: string[];
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  website?: string;
  photos?: { photo_reference: string; width: number; height: number }[];
  geometry: { location: { lat: number; lng: number } };
}

export interface PlaceDetails {
  formatted_phone_number?: string;
  international_phone_number?: string;
  formatted_address?: string;
  website?: string;
  photos?: { photo_reference: string; width: number; height: number }[];
}

interface NearbySearchResponse {
  results: PlaceResult[];
  next_page_token?: string;
  status: string;
}

const BASE = "https://maps.googleapis.com/maps/api/place";

async function fetchPage(url: string): Promise<NearbySearchResponse> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Places API HTTP ${res.status}`);
  const json = (await res.json()) as NearbySearchResponse;
  if (json.status !== "OK" && json.status !== "ZERO_RESULTS") {
    throw new Error(`Places API status: ${json.status}`);
  }
  return json;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function searchNearby(
  lat: number,
  lng: number,
  type: string
): Promise<PlaceResult[]> {
  const results: PlaceResult[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: String(RADIUS),
      type,
      key: API_KEY,
      ...(pageToken ? { pagetoken: pageToken } : {}),
    });

    const data = await fetchPage(`${BASE}/nearbysearch/json?${params}`);
    results.push(...data.results);
    pageToken = data.next_page_token;

    if (pageToken) await sleep(2000);
  } while (pageToken);

  return results;
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: "formatted_phone_number,international_phone_number,formatted_address,photos,website",
    key: API_KEY,
  });

  const res = await fetch(`${BASE}/details/json?${params}`);
  if (!res.ok) return {};
  const json = (await res.json()) as { result?: PlaceDetails; status: string };
  return json.result ?? {};
}

export function photoUrl(photoReference: string, maxWidth: number): string {
  return `${BASE}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${API_KEY}`;
}
