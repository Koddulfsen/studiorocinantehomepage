import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

const LEADS_DIR = path.resolve(process.cwd(), "leads");

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams.get("p");
  if (!p) return new NextResponse("missing path", { status: 400 });

  // Prevent path traversal
  const resolved = path.resolve(LEADS_DIR, p);
  if (!resolved.startsWith(LEADS_DIR)) {
    return new NextResponse("forbidden", { status: 403 });
  }

  if (!fs.existsSync(resolved)) {
    return new NextResponse("not found", { status: 404 });
  }

  const ext = path.extname(resolved).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  const buffer = fs.readFileSync(resolved);
  return new NextResponse(buffer, { headers: { "Content-Type": mime } });
}
