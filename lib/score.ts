// Scoring model for the GBP calculator.
// Each aspect returns { score, max, ... } — add them up for the total out of 100.

export interface PlaceData {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  regularOpeningHours?: { periods: unknown[] };
  rating?: number;
  userRatingCount?: number;
  photos?: { name: string }[];
  types?: string[];
  primaryType?: string;
  reviews?: Review[];
  businessStatus?: string;
  location?: { latitude: number; longitude: number };
  editorialSummary?: { text: string };
  // Attributes
  outdoorSeating?: boolean;
  delivery?: boolean;
  dineIn?: boolean;
  takeout?: boolean;
  reservable?: boolean;
  servesBeer?: boolean;
  servesWine?: boolean;
  servesBrunch?: boolean;
  servesVegetarianFood?: boolean;
  wheelchairAccessibleEntrance?: boolean;
  goodForChildren?: boolean;
  goodForGroups?: boolean;
  liveMusic?: boolean;
  menuForChildren?: boolean;
  servesCocktails?: boolean;
  servesDessert?: boolean;
  servesCoffee?: boolean;
}

export interface Review {
  name: string;
  rating: number;
  publishTime: string;
  relativePublishTimeDescription: string;
  text?: { text: string };
  authorAttribution?: { displayName: string };
  ownerResponse?: { text: string };
}

export interface YelpData {
  found: boolean;
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  url?: string;
}

// ── Individual aspect scores ─────────────────────────────────────────────────

export function scoreWebsite(place: PlaceData) {
  const present = !!place.websiteUri;
  return { score: present ? 15 : 0, max: 15, present, value: place.websiteUri ?? null };
}

export function scoreBasics(place: PlaceData) {
  const phone = !!place.nationalPhoneNumber;
  const address = !!place.formattedAddress;
  const hours = !!place.regularOpeningHours;
  return {
    score: (phone ? 5 : 0) + (address ? 5 : 0) + (hours ? 5 : 0),
    max: 15,
    phone,
    address,
    hours,
  };
}

export function scoreReviews(place: PlaceData) {
  const rating = place.rating ?? 0;
  const count = place.userRatingCount ?? 0;

  const ratingScore = Math.round((rating / 5) * 10);

  let countScore = 0;
  if (count >= 76) countScore = 15;
  else if (count >= 31) countScore = 12;
  else if (count >= 11) countScore = 8;
  else if (count >= 1) countScore = 4;

  return { score: ratingScore + countScore, max: 25, rating, count, ratingScore, countScore };
}

export function scorePhotos(place: PlaceData) {
  const count = place.photos?.length ?? 0;
  let score = 0;
  if (count >= 10) score = 10;
  else if (count >= 4) score = 7;
  else if (count >= 1) score = 4;
  return { score, max: 10, count };
}

const GENERIC_TYPES = new Set([
  "food", "restaurant", "establishment", "point_of_interest",
  "store", "health", "lodging", "premise", "geocode",
]);

export function scoreCategory(place: PlaceData) {
  const types = place.types ?? [];
  const primaryType = place.primaryType ?? "";
  const specificTypes = types.filter((t) => !GENERIC_TYPES.has(t));
  const isSpecific = !GENERIC_TYPES.has(primaryType) && primaryType !== "";

  let score = 0;
  if (isSpecific && specificTypes.length >= 2) score = 10;
  else if (isSpecific) score = 7;
  else if (specificTypes.length > 0) score = 4;
  else score = 2;

  return { score, max: 10, primaryType, isSpecific, specificCount: specificTypes.length };
}

const ATTRIBUTE_KEYS: (keyof PlaceData)[] = [
  "outdoorSeating", "delivery", "dineIn", "takeout", "reservable",
  "servesBeer", "servesWine", "servesBrunch", "servesVegetarianFood",
  "wheelchairAccessibleEntrance", "goodForChildren", "goodForGroups",
  "liveMusic", "menuForChildren", "servesCocktails", "servesDessert", "servesCoffee",
];

export function scoreAttributes(place: PlaceData) {
  const filled = ATTRIBUTE_KEYS.filter((k) => place[k] !== undefined && place[k] !== null).length;
  let score = 0;
  if (filled >= 8) score = 10;
  else if (filled >= 4) score = 6;
  else if (filled >= 1) score = 3;
  return { score, max: 10, filledCount: filled, totalChecked: ATTRIBUTE_KEYS.length };
}

export function scoreClaimed(place: PlaceData) {
  const hasOwnerResponse = (place.reviews ?? []).some((r) => !!r.ownerResponse);
  return { score: hasOwnerResponse ? 5 : 0, max: 5, likelyClaimed: hasOwnerResponse };
}

export function scoreLastActive(place: PlaceData) {
  const reviews = place.reviews ?? [];
  if (reviews.length === 0) return { score: 0, max: 5, daysSinceLastReview: null };

  const sorted = [...reviews].sort(
    (a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
  );
  const latest = new Date(sorted[0].publishTime);
  const days = Math.floor((Date.now() - latest.getTime()) / (1000 * 60 * 60 * 24));

  let score = 0;
  if (days <= 30) score = 5;
  else if (days <= 90) score = 3;
  else if (days <= 180) score = 1;

  return { score, max: 5, daysSinceLastReview: days };
}

export function scoreYelp(yelp: YelpData, place: PlaceData) {
  if (!yelp.found) return { score: 0, max: 5, found: false, consistent: false };

  const nameMatch = yelp.name?.toLowerCase().trim() === place.displayName?.text?.toLowerCase().trim();
  const phoneMatch = yelp.phone?.replace(/\D/g, "") === place.nationalPhoneNumber?.replace(/\D/g, "");
  const consistent = nameMatch && phoneMatch;

  return { score: consistent ? 5 : 2, max: 5, found: true, consistent, nameMatch, phoneMatch };
}

// ── Master scorer ────────────────────────────────────────────────────────────

export interface ScoreResult {
  total: number;
  max: 100;
  website: ReturnType<typeof scoreWebsite>;
  basics: ReturnType<typeof scoreBasics>;
  reviews: ReturnType<typeof scoreReviews>;
  photos: ReturnType<typeof scorePhotos>;
  category: ReturnType<typeof scoreCategory>;
  attributes: ReturnType<typeof scoreAttributes>;
  claimed: ReturnType<typeof scoreClaimed>;
  lastActive: ReturnType<typeof scoreLastActive>;
  yelp: ReturnType<typeof scoreYelp>;
}

export function scorePlace(place: PlaceData, yelp: YelpData): ScoreResult {
  const website = scoreWebsite(place);
  const basics = scoreBasics(place);
  const reviews = scoreReviews(place);
  const photos = scorePhotos(place);
  const category = scoreCategory(place);
  const attributes = scoreAttributes(place);
  const claimed = scoreClaimed(place);
  const lastActive = scoreLastActive(place);
  const yelpScore = scoreYelp(yelp, place);

  const total = website.score + basics.score + reviews.score + photos.score +
    category.score + attributes.score + claimed.score + lastActive.score + yelpScore.score;

  return { total, max: 100, website, basics, reviews, photos, category, attributes, claimed, lastActive, yelp: yelpScore };
}
