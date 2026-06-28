#!/usr/bin/env node
// Usage: node scripts/apply-copy.js <slug> <version> '<json>'
// Writes generated copy into data/clients/<slug>.json

const fs = require("fs");
const path = require("path");

const [, , slug, version, jsonStr] = process.argv;
if (!slug || !version || !jsonStr) {
  console.error("Usage: node scripts/apply-copy.js <slug> <version> '<json>'");
  process.exit(1);
}

const filePath = path.resolve(__dirname, `../data/clients/${slug}.json`);
if (!fs.existsSync(filePath)) {
  console.error(`No client file at ${filePath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(filePath, "utf8"));
const copy = JSON.parse(jsonStr);
const v = parseInt(version, 10);
const idx = config.templates.findIndex((t) => t.version === v);
if (idx < 0) {
  console.error(`Version ${v} not found in ${slug}`);
  process.exit(1);
}

config.templates[idx].copy = copy;
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
console.log(`✓ Applied copy to ${slug} v${v}`);
