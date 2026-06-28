import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const API_KEY = process.env.PEXELS_KEY!;
const OUT_DIR = path.resolve(process.cwd(), "public/stock");

const CATEGORIES: { folder: string; query: string; count: number }[] = [
  { folder: "hero",       query: "restaurant interior moody dark",     count: 8 },
  { folder: "dish",       query: "restaurant food plating dark",       count: 10 },
  { folder: "atmosphere", query: "restaurant ambiance candlelight",    count: 8 },
  { folder: "bar",        query: "espresso coffee bar counter",        count: 8 },
  { folder: "facade",     query: "restaurant storefront exterior",     count: 6 },
  { folder: "detail",     query: "food texture close up macro",        count: 8 },
  { folder: "people",     query: "chef kitchen portrait restaurant",   count: 6 },
];

interface PexelsPhoto {
  id: number;
  src: { large2x: string; original: string };
  photographer: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

async function searchPexels(query: string, count: number): Promise<PexelsPhoto[]> {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  const res = await fetch(url, { headers: { Authorization: API_KEY } });
  if (!res.ok) throw new Error(`Pexels API ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as PexelsResponse;
  return json.photos;
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        downloadFile(res.headers.location!, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve()));
    }).on("error", (e) => { fs.unlink(dest, () => {}); reject(e); });
  });
}

async function main() {
  if (!API_KEY) { console.error("Set PEXELS_KEY env var"); process.exit(1); }

  for (const cat of CATEGORIES) {
    const dir = path.join(OUT_DIR, cat.folder);
    fs.mkdirSync(dir, { recursive: true });

    process.stdout.write(`\n${cat.folder} — searching "${cat.query}"...\n`);
    const photos = await searchPexels(cat.query, cat.count);

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      const dest = path.join(dir, `${cat.folder}-${String(i + 1).padStart(2, "0")}.jpg`);
      if (fs.existsSync(dest)) { console.log(`  skip ${path.basename(dest)}`); continue; }
      process.stdout.write(`  ↓ ${i + 1}/${photos.length} (by ${photo.photographer})\n`);
      await downloadFile(photo.src.large2x, dest);
    }
  }

  console.log("\n✓ Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
