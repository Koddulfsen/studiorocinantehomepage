import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const SHORTLIST_PATH = path.resolve(process.cwd(), "leads", "shortlist.json");

function load(): string[] {
  return fs.existsSync(SHORTLIST_PATH)
    ? JSON.parse(fs.readFileSync(SHORTLIST_PATH, "utf8"))
    : [];
}

function save(ids: string[]) {
  fs.writeFileSync(SHORTLIST_PATH, JSON.stringify(ids, null, 2));
}

export async function GET() {
  return NextResponse.json(load());
}

export async function POST(req: NextRequest) {
  const { placeId, action } = await req.json() as { placeId: string; action: "add" | "remove" };
  const list = load();

  if (action === "add" && !list.includes(placeId)) {
    list.push(placeId);
  } else if (action === "remove") {
    const idx = list.indexOf(placeId);
    if (idx !== -1) list.splice(idx, 1);
  }

  save(list);
  return NextResponse.json({ ok: true, count: list.length });
}
