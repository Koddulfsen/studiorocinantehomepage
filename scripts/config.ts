import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export const API_KEY = process.env.GOOGLE_PLACES_KEY!;
if (!API_KEY) throw new Error("GOOGLE_PLACES_KEY not set in .env.local");

export const RADIUS = 800; // metres
export const TYPES = ["restaurant", "cafe", "bar"];
export const MAX_PHOTOS = 6;
export const PHOTO_MAX_WIDTH = 1600;

export interface NeighbourhoodConfig {
  name: string;
  area: string;
  country: string;
  province: string;
  city: string;
  lat: number;
  lng: number;
}

export const NEIGHBOURHOODS: NeighbourhoodConfig[] = [
  // ── Downtown Core ───────────────────────────────────────────
  { name: "financial-district",      area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6481, lng: -79.3773 },
  { name: "entertainment-district",  area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6454, lng: -79.3928 },
  { name: "king-west",               area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6448, lng: -79.4011 },
  { name: "queen-west",              area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6486, lng: -79.4017 },
  { name: "chinatown",               area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6527, lng: -79.3975 },
  { name: "kensington-market",       area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6541, lng: -79.4006 },
  { name: "harbourfront",            area: "downtown-core",  country: "ca", province: "on", city: "toronto", lat: 43.6386, lng: -79.3808 },

  // ── West End ─────────────────────────────────────────────────
  { name: "little-italy",            area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6549, lng: -79.4194 },
  { name: "dufferin-grove",          area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6534, lng: -79.4320 },
  { name: "little-portugal",         area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6488, lng: -79.4380 },
  { name: "bloordale",               area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6601, lng: -79.4372 },
  { name: "ossington",               area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6500, lng: -79.4267 },
  { name: "parkdale",                area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6419, lng: -79.4477 },
  { name: "roncesvalles",            area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6486, lng: -79.4534 },
  { name: "bloor-west-village",      area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6523, lng: -79.4742 },
  { name: "junction",                area: "west-end",       country: "ca", province: "on", city: "toronto", lat: 43.6641, lng: -79.4742 },

  // ── East End ─────────────────────────────────────────────────
  { name: "riverside",               area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6572, lng: -79.3478 },
  { name: "leslieville",             area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6611, lng: -79.3375 },
  { name: "little-india",            area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6669, lng: -79.3322 },
  { name: "riverdale",               area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6703, lng: -79.3533 },
  { name: "greektown",               area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6766, lng: -79.3436 },
  { name: "woodbine",                area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6773, lng: -79.3163 },
  { name: "the-beaches",             area: "east-end",       country: "ca", province: "on", city: "toronto", lat: 43.6703, lng: -79.2955 },

  // ── Midtown ──────────────────────────────────────────────────
  { name: "cabbagetown",             area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6631, lng: -79.3651 },
  { name: "church-wellesley",        area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6646, lng: -79.3793 },
  { name: "rosedale",                area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6834, lng: -79.3798 },
  { name: "yorkville",               area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6707, lng: -79.3939 },
  { name: "annex",                   area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6699, lng: -79.4023 },
  { name: "summerhill",              area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6851, lng: -79.3884 },
  { name: "davisville",              area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6987, lng: -79.3908 },
  { name: "yonge-eglinton",          area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.7065, lng: -79.3986 },
  { name: "forest-hill",             area: "midtown",        country: "ca", province: "on", city: "toronto", lat: 43.6952, lng: -79.4142 },

  // ── North York ───────────────────────────────────────────────
  { name: "yonge-sheppard",          area: "north-york",     country: "ca", province: "on", city: "toronto", lat: 43.7612, lng: -79.4103 },
  { name: "willowdale",              area: "north-york",     country: "ca", province: "on", city: "toronto", lat: 43.7706, lng: -79.4007 },
  { name: "north-york-centre",       area: "north-york",     country: "ca", province: "on", city: "toronto", lat: 43.7682, lng: -79.4138 },
  { name: "bayview-village",         area: "north-york",     country: "ca", province: "on", city: "toronto", lat: 43.7638, lng: -79.3784 },
  { name: "lawrence-park",           area: "north-york",     country: "ca", province: "on", city: "toronto", lat: 43.7227, lng: -79.3969 },

  // ── Etobicoke ────────────────────────────────────────────────
  { name: "humber-bay",              area: "etobicoke",      country: "ca", province: "on", city: "toronto", lat: 43.6234, lng: -79.4842 },
  { name: "mimico",                  area: "etobicoke",      country: "ca", province: "on", city: "toronto", lat: 43.6108, lng: -79.4977 },
  { name: "islington-village",       area: "etobicoke",      country: "ca", province: "on", city: "toronto", lat: 43.6469, lng: -79.5238 },
  { name: "etobicoke-centre",        area: "etobicoke",      country: "ca", province: "on", city: "toronto", lat: 43.6649, lng: -79.5261 },
  { name: "long-branch",             area: "etobicoke",      country: "ca", province: "on", city: "toronto", lat: 43.5964, lng: -79.5430 },

  // ── Scarborough ──────────────────────────────────────────────
  { name: "birch-cliff",             area: "scarborough",    country: "ca", province: "on", city: "toronto", lat: 43.6929, lng: -79.2581 },
  { name: "wexford",                 area: "scarborough",    country: "ca", province: "on", city: "toronto", lat: 43.7494, lng: -79.2881 },
  { name: "kennedy-road",            area: "scarborough",    country: "ca", province: "on", city: "toronto", lat: 43.7560, lng: -79.2757 },
  { name: "scarborough-town-centre", area: "scarborough",    country: "ca", province: "on", city: "toronto", lat: 43.7764, lng: -79.2568 },
  { name: "agincourt",               area: "scarborough",    country: "ca", province: "on", city: "toronto", lat: 43.7894, lng: -79.2681 },

  // ── East York ────────────────────────────────────────────────
  { name: "pape-village",            area: "east-york",      country: "ca", province: "on", city: "toronto", lat: 43.6828, lng: -79.3417 },
  { name: "danforth-village",        area: "east-york",      country: "ca", province: "on", city: "toronto", lat: 43.6953, lng: -79.3198 },
];
