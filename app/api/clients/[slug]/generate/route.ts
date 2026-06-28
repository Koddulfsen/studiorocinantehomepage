import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import type { ClientConfig } from "@/lib/clientConfig";
import type { TemplateCopy } from "@/lib/templateCopy";

const CLIENTS_DIR = path.resolve(process.cwd(), "data/clients");
const client = new Anthropic();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const { version, vibe, name, cuisine, neighbourhood } = body;

  const prompt = `You are writing website copy for a Toronto restaurant or café.

Business name: ${name}
${cuisine ? `Cuisine / type: ${cuisine}` : ""}
${neighbourhood ? `Neighbourhood: ${neighbourhood}` : ""}
Vibe description: ${vibe}

Write copy that feels specific to this place — not generic restaurant boilerplate. Match the energy of the vibe description.

Respond ONLY with valid JSON in this exact shape (no markdown, no explanation):
{
  "tagline": "one short evocative line, max 10 words",
  "body": "2-3 sentences, warm and specific, no clichés",
  "cta": "2-4 word call to action (e.g. 'Reserve a Table', 'Come In')",
  "eyebrow": "3-5 word context line in all caps (e.g. 'WEST END TORONTO' or 'OPEN SINCE 2018')",
  "label": "2-3 word section header in all caps (e.g. 'THE MENU' or 'FROM OUR KITCHEN')",
  "menuItems": [
    { "name": "dish or drink name", "desc": "one short phrase description", "price": "$XX" },
    { "name": "dish or drink name", "desc": "one short phrase description", "price": "$XX" },
    { "name": "dish or drink name", "desc": "one short phrase description", "price": "$XX" },
    { "name": "dish or drink name", "desc": "one short phrase description", "price": "$XX" },
    { "name": "dish or drink name", "desc": "one short phrase description", "price": "$XX" },
    { "name": "dish or drink name", "price": "$XX" },
    { "name": "dish or drink name", "price": "$XX" },
    { "name": "dish or drink name", "price": "$XX" }
  ]
}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  let copy: TemplateCopy;
  try {
    copy = JSON.parse(text.trim());
  } catch {
    return NextResponse.json({ error: "Failed to parse model response", raw: text }, { status: 500 });
  }

  // Save copy + vibe into the client config
  const p = path.join(CLIENTS_DIR, `${slug}.json`);
  if (fs.existsSync(p)) {
    const config: ClientConfig = JSON.parse(fs.readFileSync(p, "utf8"));
    config.vibe = vibe;
    const idx = config.templates.findIndex((t) => t.version === version);
    if (idx >= 0) config.templates[idx].copy = copy;
    fs.writeFileSync(p, JSON.stringify(config, null, 2));
  }

  return NextResponse.json({ copy });
}
