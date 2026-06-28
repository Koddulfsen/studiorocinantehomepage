import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const PHOTOS_DIR = path.resolve(process.cwd(), "public/clients");

export async function POST(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dir = path.join(PHOTOS_DIR, slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return NextResponse.json({ dir: `public/clients/${slug}/` });
}
