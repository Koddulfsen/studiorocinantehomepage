import type { PlaceResult } from "./places";

export type SocialPlatform = "instagram" | "facebook" | "linktree" | "yelp" | "tripadvisor" | "delivery" | null;

export interface WebsiteClassification {
  hasRealWebsite: boolean;
  social: SocialPlatform;
  url?: string;
}

export function classifyWebsite(url?: string): WebsiteClassification {
  if (!url) return { hasRealWebsite: false, social: null };
  const u = url.toLowerCase();
  if (u.includes("instagram.com"))    return { hasRealWebsite: false, social: "instagram",    url };
  if (u.includes("facebook.com"))     return { hasRealWebsite: false, social: "facebook",     url };
  if (u.includes("linktr.ee"))        return { hasRealWebsite: false, social: "linktree",     url };
  if (u.includes("yelp.com"))         return { hasRealWebsite: false, social: "yelp",         url };
  if (u.includes("tripadvisor."))     return { hasRealWebsite: false, social: "tripadvisor",  url };
  if (
    u.includes("doordash.com") ||
    u.includes("ubereats.com") ||
    u.includes("skipthedishes.com") ||
    u.includes("order.online") ||
    u.includes("ritual.co")
  )                                   return { hasRealWebsite: false, social: "delivery",     url };
  return { hasRealWebsite: true, social: null, url };
}

export function isOperational(place: PlaceResult): boolean {
  return place.business_status === "OPERATIONAL";
}

export function filterLeads(places: PlaceResult[]): PlaceResult[] {
  return places.filter(isOperational);
}

export function dedupeByPlaceId<T extends { place_id: string }>(places: T[]): T[] {
  const seen = new Set<string>();
  return places.filter((p) => {
    if (seen.has(p.place_id)) return false;
    seen.add(p.place_id);
    return true;
  });
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
