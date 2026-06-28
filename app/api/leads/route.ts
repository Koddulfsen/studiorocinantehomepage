import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function GET() {
  const indexPath = path.resolve(process.cwd(), "leads", "index.json");
  if (!fs.existsSync(indexPath)) {
    return NextResponse.json([]);
  }
  const data = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  return NextResponse.json(data);
}
