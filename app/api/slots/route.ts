import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const DATA_FILE = path.resolve(process.cwd(), "data/template-slots.json");

function loadAll(): Record<string, unknown> {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

export async function GET() {
  return NextResponse.json(loadAll());
}

export async function POST(req: NextRequest) {
  const { templateId, config } = await req.json();
  const all = loadAll();
  all[templateId] = config;
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2));
  return NextResponse.json({ ok: true });
}
