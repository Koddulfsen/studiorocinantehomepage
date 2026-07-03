# GBP Score Calculator — Build Guide

A homepage tool that lets a business owner search for their business on Google Maps, select it, and instantly get a scored breakdown of their online presence — surfacing exactly what we fix.

---

## What We're Scoring

Nine checkable aspects pulled from the Google Places API (v1) and Yelp Fusion API. Each maps to a real ranking factor from our workflow doc.

| # | Aspect | Source | Weight |
|---|---|---|---|
| 1 | Website linked to GBP | Places API v1 | 15 pts |
| 2 | Phone, address, hours on profile | Places API v1 | 15 pts (5 each) |
| 3 | Review count + rating | Places API v1 | 25 pts |
| 4 | Photos | Places API v1 | 10 pts |
| 5 | Category specificity | Places API v1 | 10 pts |
| 6 | Attributes filled (seating, delivery, etc.) | Places API v1 | 10 pts |
| 7 | Listing appears claimed | Places API v1 (proxy via owner responses) | 5 pts |
| 8 | Last active (review recency) | Places API v1 review timestamps | 5 pts |
| 9 | NAP consistent on Yelp | Yelp Fusion API | 5 pts |
| | **Total** | | **100 pts** |

---

## Step 0 — Framework & Infrastructure

Set up everything needed before any scoring logic is written.

**Subtasks:**
- [ ] Enable **Places API (New)** in Google Cloud Console
- [ ] Enable **Maps JavaScript API** in Google Cloud Console (for Autocomplete widget)
- [ ] Create a Yelp Fusion API app and get the API key (free, 500 calls/day)
- [ ] Add keys to `.env.local`: `GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `YELP_API_KEY`
- [ ] Create `/app/api/places/route.ts` — server-side proxy that takes a `placeId` and returns Place Details (keeps API key off the client)
- [ ] Create `/app/api/yelp/route.ts` — server-side proxy that takes `name` + `lat` + `lng` and returns the best matching Yelp business
- [ ] Create `/components/gbp-calculator/` directory for all calculator components
- [ ] Create `/lib/score.ts` — the scoring model: types, weights, and the `scorePlace()` function that takes a Place Details response and returns a structured score object
- [ ] Add the calculator section to the homepage (`app/page.tsx`) as a new section below services

---

## Step 1 — Business Search & Autocomplete

The entry point. User types their business name, selects from the Google Maps autocomplete dropdown.

**Subtasks:**
- [ ] Load the Maps JavaScript API with the `places` library via `@googlemaps/js-api-loader`
- [ ] Build `<BusinessSearch />` component with a styled input + autocomplete dropdown
- [ ] Filter autocomplete to `establishment` type only (no addresses, no regions)
- [ ] On selection: extract `placeId` and `displayName`, fire the Places Details fetch
- [ ] Show a loading state while fetching
- [ ] Handle "business not found" gracefully (prompt to search again)

---

## Step 2 — Website Linked

Checks whether a website URL is attached to the GBP listing. One of the strongest ranking signals — cross-links GBP ↔ website.

**Places API field:** `websiteUri`

**Scoring:**
- Present → 15 pts
- Absent → 0 pts

**Subtasks:**
- [ ] Pull `websiteUri` from Place Details response
- [ ] Add to `scorePlace()`: `website: { score, max: 15, value: websiteUri | null }`
- [ ] Build score card component: "Website linked" ✓ green / ✗ red
- [ ] If absent: show fix label "We add this on day one"

---

## Step 3 — Profile Basics (Phone, Address, Hours)

The three non-negotiable fields. Missing any of these tanks completeness and confuses potential customers.

**Places API fields:** `nationalPhoneNumber`, `formattedAddress`, `regularOpeningHours`

**Scoring:**
- Phone present → 5 pts
- Address present → 5 pts
- Hours present → 5 pts

**Subtasks:**
- [ ] Pull all three fields from Place Details response
- [ ] Add to `scorePlace()`: `basics: { phone, address, hours }` each with `{ score, max: 5, present: boolean }`
- [ ] Display as three inline chips: Phone ✓, Address ✓, Hours ✗ etc.
- [ ] Flag any missing ones with "We fill this in during setup"

---

## Step 4 — Reviews (Count + Rating)

The biggest single factor. Both quantity and rating matter independently.

**Places API fields:** `rating`, `userRatingCount`

**Scoring (25 pts total):**
- Rating (10 pts): `(rating / 5) * 10`, rounded
- Count (15 pts): 0→0, 1–10→4, 11–30→8, 31–75→12, 76+→15

**Subtasks:**
- [ ] Pull `rating` and `userRatingCount` from Place Details response
- [ ] Add to `scorePlace()`: `reviews: { score, max: 25, rating, count }`
- [ ] Display: star rating visual + review count, benchmarked ("Toronto average: ~42 reviews")
- [ ] If count < 30: show "Review cards get you here faster" note

---

## Step 5 — Photos

Active photo presence signals a live, managed listing. API returns up to 10 photo references.

**Places API field:** `photos[]`

**Scoring (10 pts):**
- 0 photos → 0 pts
- 1–3 photos → 4 pts
- 4–9 photos → 7 pts
- 10 (API max returned) → 10 pts

**Subtasks:**
- [ ] Pull `photos[]` from Place Details response, count length
- [ ] Add to `scorePlace()`: `photos: { score, max: 10, count }`
- [ ] Display: photo count with a note that API caps at 10 shown ("10+ photos on your listing")
- [ ] Show one of the business's actual photos as a thumbnail in the UI (using the photo reference URL)
- [ ] If low: "We upload a fresh batch during setup and drip monthly"

---

## Step 6 — Category Specificity

Primary category is the #1 controllable ranking factor. "Cafe" ranks completely differently from "Espresso Bar" or "Specialty Coffee Shop."

**Places API field:** `types[]`

**Scoring (10 pts):**
- Types array contains specific subcategory (e.g. `italian_restaurant`, `coffee_shop`, `nail_salon`) → 10 pts
- Only generic types (`food`, `restaurant`, `establishment`, `point_of_interest`) → 3 pts
- Mixed (has one specific + generics) → 7 pts

**Subtasks:**
- [ ] Pull `types[]` from Place Details response
- [ ] Build a `GENERIC_TYPES` set: `["food", "restaurant", "establishment", "point_of_interest", "store", "health", "lodging"]`
- [ ] Score: count how many types are NOT in the generic set
- [ ] Add to `scorePlace()`: `category: { score, max: 10, primaryType, isSpecific }`
- [ ] Display: show their detected primary category, flag if generic
- [ ] If generic: "We research and set the most specific category for your business type"

---

## Step 7 — Attributes Filled

Attributes (outdoor seating, delivery, reservations, accessibility, etc.) feed both completeness and prominence signals. Places API v1 exposes these as booleans.

**Places API fields (v1 only):** `outdoorSeating`, `delivery`, `dineIn`, `takeout`, `reservable`, `servesBeer`, `servesWine`, `servesBrunch`, `servesVegetarianFood`, `wheelchairAccessibleEntrance`, `goodForChildren`, `goodForGroups`, `liveMusic`

**Scoring (10 pts):**
- Count how many attribute fields are non-null (set to true or false — both mean the field is filled)
- 0 set → 0 pts
- 1–3 set → 3 pts
- 4–7 set → 6 pts
- 8+ set → 10 pts

**Subtasks:**
- [ ] Define `ATTRIBUTE_FIELDS` array of all attribute keys to check
- [ ] Pull all from Place Details response, count non-null
- [ ] Add to `scorePlace()`: `attributes: { score, max: 10, filledCount, totalChecked }`
- [ ] Display: "X of Y attributes filled" with a few examples shown
- [ ] If low: "We fill in all relevant attributes during setup"

---

## Step 8 — Listing Appears Claimed

No direct API field. Proxied via owner responses on reviews — if the owner has responded to at least one review, the listing is almost certainly claimed and actively managed.

**Places API field:** `reviews[].authorAttribution` + check for `ownerResponse` on each review

**Scoring (5 pts):**
- At least one owner response found → 5 pts (likely claimed)
- No owner responses → 0 pts (uncertain — flag as "may be unclaimed")

**Subtasks:**
- [ ] Request `reviews` field in Place Details call
- [ ] Check each review object for presence of `ownerResponse`
- [ ] Add to `scorePlace()`: `claimed: { score, max: 5, likelyClaimed: boolean }`
- [ ] Display: "Listing appears claimed ✓" or "No owner activity detected — may be unclaimed ⚠"
- [ ] Add caveat: "We verify this manually during your free audit"

---

## Step 9 — Last Active (Review Recency)

A proxy for listing vitality. Uses the most recent review's publish timestamp.

**Places API field:** `reviews[].publishTime` (ISO timestamp in v1)

**Scoring (5 pts):**
- Review in last 30 days → 5 pts
- 31–90 days → 3 pts
- 91–180 days → 1 pt
- 180+ days → 0 pts

**Subtasks:**
- [ ] Pull `reviews[]`, sort by `publishTime` descending, take the first
- [ ] Calculate days since most recent review
- [ ] Add to `scorePlace()`: `lastActive: { score, max: 5, daysSinceLastReview }`
- [ ] Display: "Last reviewed X days ago" with colour coding (green/amber/red)
- [ ] Note: this reflects customer activity, not owner activity — frame accordingly

---

## Step 10 — NAP Consistent on Yelp

Checks whether the business's name, address, and phone on Yelp matches GBP. NAP inconsistency actively hurts local ranking.

**API:** Yelp Fusion — Business Match endpoint (`/v3/businesses/matches`) — takes name + address + city + country, returns best match with their NAP data.

**Scoring (5 pts):**
- Yelp listing found + NAP matches GBP → 5 pts
- Yelp listing found + NAP inconsistent (differs in name or phone) → 2 pts
- No Yelp listing found → 0 pts

**Subtasks:**
- [ ] In `/api/yelp/route.ts`: call Yelp Business Match with `name`, `address1`, `city`, `state`, `country` extracted from the GBP data
- [ ] Compare returned `name`, `phone`, `location.address1` against GBP equivalents (fuzzy match on name — allow minor differences)
- [ ] Add to `scorePlace()`: `yelp: { score, max: 5, found: boolean, consistent: boolean, yelpName, yelpPhone }`
- [ ] Display: "Found on Yelp ✓ / NAP consistent ✓" or surface what differs
- [ ] If missing: "We create and optimise your Yelp listing during setup"

---

## Step 11 — Score Display & CTA

The final assembled score view that ties everything together.

**Subtasks:**
- [ ] Build `<ScoreDisplay />` — large score out of 100, colour-coded (0–40 red, 41–70 amber, 71–100 green)
- [ ] Show breakdown: each of the 9 scored aspects as a row (label, score/max, status icon)
- [ ] Show the business name + one photo pulled from Places API at the top
- [ ] Add 2–3 sentence plain-English summary generated from the score data ("Your reviews are strong but your profile is missing key info that's costing you visibility.")
- [ ] CTA button: "Get this fixed" → scrolls to contact / links to services page
- [ ] Optional: "Search another business" to reset
- [ ] Handle edge case: business has no reviews yet (skip steps 8 + proxy for 7)
