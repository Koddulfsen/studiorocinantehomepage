// Patches all template CSS modules to use CSS custom properties for photo slots.
// Replaces: background: radial-gradient(...)
// With:     background: var(--slot-N, radial-gradient(...)); background-size: cover; background-position: center;
const fs = require("fs");
const path = require("path");

// Maps: [file, className, slotNumber]
// className must uniquely identify the rule block (including compound selectors)
const PATCHES = [
  ["atmosphere-corner/block/block.module.css",           ".heroRight",           1],
  ["atmosphere-corner/chronicle/chronicle.module.css",   ".heroBg",              1],
  ["atmosphere-corner/chronicle/chronicle.module.css",   ".atmosphereBlock",     2],
  ["atmosphere-corner/warmth/warmth.module.css",         ".heroBg",              1],
  ["atmosphere-corner/warmth/warmth.module.css",         ".storyImage",          2],
  ["atmosphere-manor/cellar/cellar.module.css",          ".heroLeft",            1],
  ["atmosphere-manor/cellar/cellar.module.css",          ".strip",               2],
  ["atmosphere-manor/salon/salon.module.css",            ".heroBg",              1],
  ["atmosphere-manor/salon/salon.module.css",            ".interiorImage",       2],
  ["atmosphere-manor/suite/suite.module.css",            ".image",               1],
  ["bold-neon/clash/clash.module.css",                   ".aboutImage",          1],
  ["bold-neon/pulse/pulse.module.css",                   ".heroRight",           1],
  ["food-noir/ember/noir-ember.module.css",              ".featureImage",        1],
  ["food-noir/ember/noir-ember.module.css",              ".banner",              2],
  ["food-noir/velvet/noir-velvet.module.css",            ".heroImage",           1],
  ["food-noir/velvet/noir-velvet.module.css",            ".storyImage",          2],
  ["food-polaroid/candid/candid.module.css",             ".heroPhoto",           1],
  ["food-polaroid/candid/candid.module.css",             ".photo.p1",            2],
  ["food-polaroid/candid/candid.module.css",             ".photo.p2",            3],
  ["food-polaroid/candid/candid.module.css",             ".photo.p3",            4],  // p3 not in grep but exists
  ["food-polaroid/contact/contact.module.css",           ".frameImg.f1",         1],
  ["food-polaroid/contact/contact.module.css",           ".frameImg.f2",         2],
  ["food-polaroid/contact/contact.module.css",           ".frameImg.f3",         3],
  ["food-polaroid/contact/contact.module.css",           ".frameImg.f4",         4],
  ["food-polaroid/roll/roll.module.css",                 ".heroPolaroidImg",     1],
  ["food-polaroid/roll/roll.module.css",                 ".polaroidImg.food1",   2],
  ["food-polaroid/roll/roll.module.css",                 ".polaroidImg.food2",   3],
  ["food-polaroid/roll/roll.module.css",                 ".polaroidImg.food3",   4],
  ["minimal-manor/linen/linen.module.css",               ".splitImage",          1],
  ["minimal-manor/paper/paper.module.css",               ".imageMain",           1],
  ["minimal-manor/paper/paper.module.css",               ".imageSide",           2],
  ["minimal-manor/slate/slate.module.css",               ".image",               1],
  ["story-broadsheet/byline/byline.module.css",          ".spreadImage",         1],
  ["story-broadsheet/feature/feature.module.css",        ".heroImage",           1],
  ["story-broadsheet/ledger/ledger.module.css",          ".heroImage",           1],
  ["story-market/grove/grove.module.css",                ".heroImage",           1],
  ["story-market/harvest/harvest.module.css",            ".storyImage",          1],
  ["story-market/pantry/pantry.module.css",              ".heroImage",           1],
];

const BASE = path.resolve(__dirname, "../app/templates");

// Track which files have already been processed (for per-file state)
const fileCache = new Map();

function getFile(rel) {
  if (!fileCache.has(rel)) {
    const full = path.join(BASE, rel);
    const content = fs.readFileSync(full, "utf8");
    fileCache.set(rel, { full, lines: content.split("\n") });
  }
  return fileCache.get(rel);
}

function patchClass(rel, className, slotNum) {
  const { lines } = getFile(rel);

  // Find the line where this class selector starts
  // Match .className { or .className\n{ etc., but NOT inside a @media block (we want first occurrence)
  const selectorRe = new RegExp(
    `^\\s*${className.replace(/\./g, "\\.").replace(/\s/g, "\\s*")}\\s*(,|\\{)`
  );

  let classStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (selectorRe.test(lines[i])) {
      classStart = i;
      break;
    }
  }

  if (classStart === -1) {
    console.warn(`  ⚠ class "${className}" not found in ${rel}`);
    return;
  }

  // Find the opening { — may be on the same line or next line
  let braceStart = classStart;
  while (braceStart < lines.length && !lines[braceStart].includes("{")) braceStart++;

  // Find the closing } by counting braces
  let depth = 0;
  let braceEnd = -1;
  for (let i = braceStart; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") depth++;
      else if (ch === "}") { depth--; if (depth === 0) { braceEnd = i; break; } }
    }
    if (braceEnd !== -1) break;
  }

  if (braceEnd === -1) {
    console.warn(`  ⚠ no closing brace found for "${className}" in ${rel}`);
    return;
  }

  // Within [braceStart, braceEnd], find the background: radial-gradient line
  let bgLine = -1;
  for (let i = braceStart; i <= braceEnd; i++) {
    if (/background:\s*radial-gradient/.test(lines[i])) {
      bgLine = i;
      break;
    }
  }

  if (bgLine === -1) {
    console.warn(`  ⚠ no background gradient found in "${className}" in ${rel}`);
    return;
  }

  // Extract the gradient value
  const match = lines[bgLine].match(/background:\s*(radial-gradient\(.*\))\s*;/);
  if (!match) {
    console.warn(`  ⚠ could not parse gradient on line ${bgLine + 1} in ${rel}`);
    return;
  }
  const gradient = match[1];
  const indent = lines[bgLine].match(/^(\s*)/)[1];

  // Check if next lines already have background-size / background-position
  const nextTwo = [lines[bgLine + 1] || "", lines[bgLine + 2] || ""];
  const hasSize = nextTwo.some((l) => /background-size/.test(l));
  const hasPos = nextTwo.some((l) => /background-position/.test(l));

  // Replace the background line
  lines[bgLine] = `${indent}background: var(--slot-${slotNum}, ${gradient});`;
  if (!hasSize) lines.splice(bgLine + 1, 0, `${indent}background-size: cover;`);
  const posIdx = bgLine + (hasSize ? 1 : 2);
  if (!hasPos) lines.splice(posIdx, 0, `${indent}background-position: center;`);

  console.log(`  ✓ patched ${className} → --slot-${slotNum}`);
}

// Group by file and apply all patches, then write
const byFile = new Map();
for (const [rel, cls, num] of PATCHES) {
  if (!byFile.has(rel)) byFile.set(rel, []);
  byFile.get(rel).push([cls, num]);
}

for (const [rel, patches] of byFile) {
  console.log(`\n${rel}`);
  for (const [cls, num] of patches) {
    patchClass(rel, cls, num);
  }
  const { full, lines } = getFile(rel);
  fs.writeFileSync(full, lines.join("\n"));
}

console.log("\n✓ Done patching CSS files.");
