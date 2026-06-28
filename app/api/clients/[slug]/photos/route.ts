import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const PHOTOS_DIR = path.resolve(process.cwd(), "public/clients");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dir = path.join(PHOTOS_DIR, slug);

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ photos: [], dir: `public/clients/${slug}/` });
  }

  const files = fs.readdirSync(dir).filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()));
  files.sort();

  const photos = files.map((filename) => ({
    filename,
    url: `/clients/${slug}/${encodeURIComponent(filename)}`,
  }));

  return NextResponse.json({ photos, dir: `public/clients/${slug}/` });
}
