import * as fs from "fs";
import * as path from "path";
import { NEIGHBOURHOODS, TYPES, MAX_PHOTOS, type NeighbourhoodConfig } from "./config";
import { searchNearby, getPlaceDetails } from "./lib/places";
import { filterLeads, dedupeByPlaceId, toSlug, classifyWebsite, type SocialPlatform } from "./lib/filter";
import { downloadPhotos } from "./lib/photos";

const LEADS_DIR = path.resolve(process.cwd(), "leads");

function hoodDir(hood: NeighbourhoodConfig) {
  return path.join(LEADS_DIR, hood.country, hood.province, hood.city, hood.area, hood.name);
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

export interface LeadSummary {
  slug: string;
  name: string;
  address: string;
  phone?: string;
  social: SocialPlatform;
  socialUrl?: string;
  neighbourhood: string;
  area: string;
  city: string;
  province: string;
  country: string;
  types: string[];
  rating?: number;
  ratingCount?: number;
  priceLevel?: number;
  photoCount: number;
  placeId: string;
}

async function scrapeNeighbourhood(hood: NeighbourhoodConfig): Promise<LeadSummary[]> {
  console.log(`\n── ${hood.city} / ${hood.area} / ${hood.name} ──`);
  const dir = hoodDir(hood);
  ensureDir(dir);

  const allResults = [];
  for (const type of TYPES) {
    process.stdout.write(`  ${type}... `);
    const results = await searchNearby(hood.lat, hood.lng, type);
    console.log(`${results.length} results`);
    allResults.push(...results);
  }

  const raw = dedupeByPlaceId(allResults);
  fs.writeFileSync(path.join(dir, "_raw.json"), JSON.stringify(raw, null, 2));

  const leads = filterLeads(raw);
  console.log(`  → ${leads.length} operational businesses, checking for real websites...`);

  const summaries: LeadSummary[] = [];

  for (const place of leads) {
    const slug = toSlug(place.name);
    const leadDir = path.join(dir, slug);

    const details = await getPlaceDetails(place.place_id);
    const { hasRealWebsite, social, url: socialUrl } = classifyWebsite(details.website);

    if (hasRealWebsite) {
      process.stdout.write(`  ✗ ${place.name} · has website\n`);
      continue;
    }

    ensureDir(leadDir);

    const photoRefs = (details.photos ?? place.photos ?? [])
      .slice(0, MAX_PHOTOS)
      .map((p) => p.photo_reference);

    const photoFiles = photoRefs.length > 0
      ? await downloadPhotos(photoRefs, path.join(leadDir, "photos"))
      : [];

    const data = {
      slug,
      placeId: place.place_id,
      name: place.name,
      address: details.formatted_address ?? place.vicinity,
      phone: details.formatted_phone_number,
      social,
      socialUrl,
      neighbourhood: hood.name,
      area: hood.area,
      city: hood.city,
      province: hood.province,
      country: hood.country,
      types: place.types,
      rating: place.rating,
      ratingCount: place.user_ratings_total,
      priceLevel: place.price_level,
      photos: photoFiles,
      coords: place.geometry.location,
    };

    fs.writeFileSync(path.join(leadDir, "data.json"), JSON.stringify(data, null, 2));

    const socialTag = social ? ` · ${social}` : "";
    process.stdout.write(
      `  ✓ ${place.name} · ${details.formatted_phone_number ?? "no phone"}${socialTag} · ${photoFiles.length} photos\n`
    );

    summaries.push({
      slug,
      name: place.name,
      address: data.address,
      phone: details.formatted_phone_number,
      social,
      socialUrl,
      neighbourhood: hood.name,
      area: hood.area,
      city: hood.city,
      province: hood.province,
      country: hood.country,
      types: place.types,
      rating: place.rating,
      ratingCount: place.user_ratings_total,
      priceLevel: place.price_level,
      photoCount: photoFiles.length,
      placeId: place.place_id,
    });
  }

  return summaries;
}

function loadIndex(p: string): LeadSummary[] {
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : [];
}

function saveIndex(p: string, data: LeadSummary[]) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

async function main() {
  const target = process.argv[2];
  const hoods = target
    ? NEIGHBOURHOODS.filter((h) => h.name === target || h.area === target)
    : NEIGHBOURHOODS;

  if (hoods.length === 0) {
    console.error(`No neighbourhood or area matching "${target}"`);
    process.exit(1);
  }

  const globalIndexPath = path.join(LEADS_DIR, "index.json");
  const globalIndex = loadIndex(globalIndexPath);
  const globalById = new Map(globalIndex.map((s) => [s.placeId, s]));

  for (const hood of hoods) {
    const summaries = await scrapeNeighbourhood(hood);

    const cityIndexPath = path.join(
      LEADS_DIR, hood.country, hood.province, hood.city, "index.json"
    );
    const cityIndex = loadIndex(cityIndexPath);
    const cityById = new Map(cityIndex.map((s) => [s.placeId, s]));
    summaries.forEach((s) => cityById.set(s.placeId, s));
    saveIndex(cityIndexPath, [...cityById.values()]);

    summaries.forEach((s) => globalById.set(s.placeId, s));
    saveIndex(globalIndexPath, [...globalById.values()]);
  }

  console.log(`\n✓ Done. ${globalById.size} total leads in index.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
