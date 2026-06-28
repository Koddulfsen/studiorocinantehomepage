import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import type { ClientConfig } from "@/lib/clientConfig";

const CLIENTS_DIR = path.resolve(process.cwd(), "data/clients");

function configPath(slug: string) {
  return path.join(CLIENTS_DIR, `${slug}.json`);
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = configPath(slug);
  if (!fs.existsSync(p)) {
    return NextResponse.json({ templates: [] });
  }
  const config: ClientConfig = JSON.parse(fs.readFileSync(p, "utf8"));
  return NextResponse.json(config);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json();

  if (!fs.existsSync(CLIENTS_DIR)) {
    fs.mkdirSync(CLIENTS_DIR, { recursive: true });
  }

  const p = configPath(slug);
  let config: ClientConfig = { templates: [] };
  if (fs.existsSync(p)) {
    config = JSON.parse(fs.readFileSync(p, "utf8"));
  }

  const { version, templateId, fontPreset, radius, accent, titleSize, titleTransform, slots, copy } = body;
  const idx = config.templates.findIndex((t) => t.version === version);
  const entry = { version, templateId, fontPreset, radius, accent, titleSize, titleTransform, slots, ...(copy ? { copy } : {}) };

  if (idx >= 0) {
    config.templates[idx] = entry;
  } else {
    config.templates.push(entry);
  }

  config.templates.sort((a, b) => a.version - b.version);
  fs.writeFileSync(p, JSON.stringify(config, null, 2));
  return NextResponse.json({ ok: true });
}
