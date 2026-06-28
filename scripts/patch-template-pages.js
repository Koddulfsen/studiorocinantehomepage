// Wraps each template page.tsx in <TemplateShell templateId="...">
// Also handles food-noir/obsidian specially (inline bg → CSS var)
const fs = require("fs");
const path = require("path");

const BASE = path.resolve(__dirname, "../app/templates");

const PAGES = [
  ["food-noir/ember",              "food-noir-ember"],
  ["food-noir/velvet",             "food-noir-velvet"],
  ["food-noir/obsidian",           "food-noir-obsidian"],
  ["food-polaroid/candid",         "food-polaroid-candid"],
  ["food-polaroid/contact",        "food-polaroid-contact"],
  ["food-polaroid/roll",           "food-polaroid-roll"],
  ["atmosphere-corner/block",      "atmosphere-corner-block"],
  ["atmosphere-corner/chronicle",  "atmosphere-corner-chronicle"],
  ["atmosphere-corner/warmth",     "atmosphere-corner-warmth"],
  ["atmosphere-manor/cellar",      "atmosphere-manor-cellar"],
  ["atmosphere-manor/salon",       "atmosphere-manor-salon"],
  ["atmosphere-manor/suite",       "atmosphere-manor-suite"],
  ["bold-marquee/billboard",       "bold-marquee-billboard"],
  ["bold-marquee/signal",          "bold-marquee-signal"],
  ["bold-marquee/stamp",           "bold-marquee-stamp"],
  ["bold-neon/clash",              "bold-neon-clash"],
  ["bold-neon/pulse",              "bold-neon-pulse"],
  ["bold-neon/volt",               "bold-neon-volt"],
  ["minimal-manor/linen",          "minimal-manor-linen"],
  ["minimal-manor/paper",          "minimal-manor-paper"],
  ["minimal-manor/slate",          "minimal-manor-slate"],
  ["story-broadsheet/byline",      "story-broadsheet-byline"],
  ["story-broadsheet/feature",     "story-broadsheet-feature"],
  ["story-broadsheet/ledger",      "story-broadsheet-ledger"],
  ["story-market/grove",           "story-market-grove"],
  ["story-market/harvest",         "story-market-harvest"],
  ["story-market/pantry",          "story-market-pantry"],
];

for (const [rel, templateId] of PAGES) {
  const file = path.join(BASE, rel, "page.tsx");
  let content = fs.readFileSync(file, "utf8");

  // Skip if already patched
  if (content.includes("TemplateShell")) {
    console.log(`  skip ${rel} (already patched)`);
    continue;
  }

  // 1. Add "use client" at top
  if (!content.startsWith('"use client"')) {
    content = `"use client";\n\n` + content;
  }

  // 2. Add TemplateShell import after first import line
  const firstImportEnd = content.indexOf("\n", content.indexOf("import ")) + 1;
  content =
    content.slice(0, firstImportEnd) +
    `import { TemplateShell } from "@/components/TemplateShell";\n` +
    content.slice(firstImportEnd);

  // 3. Wrap the return's top-level JSX in <TemplateShell>
  // Find "return (" and the matching closing paren
  const returnIdx = content.lastIndexOf("return (");
  if (returnIdx === -1) {
    console.warn(`  ⚠ no "return (" found in ${rel}`);
    continue;
  }

  // Insert TemplateShell wrapper inside the return
  // Replace: return (
  //            <div ...>...</div>
  //          );
  // With:    return (
  //            <TemplateShell templateId="...">
  //              <div ...>...</div>
  //            </TemplateShell>
  //          );
  const afterReturn = returnIdx + "return (".length;
  content =
    content.slice(0, afterReturn) +
    `\n      <TemplateShell templateId="${templateId}">` +
    content.slice(afterReturn);

  // Find the last ); before end of file (closing of return)
  const lastParen = content.lastIndexOf("\n  );");
  if (lastParen === -1) {
    // try with 4 spaces
    const lastParen2 = content.lastIndexOf("\n    );");
    if (lastParen2 !== -1) {
      content =
        content.slice(0, lastParen2) +
        `\n      </TemplateShell>` +
        content.slice(lastParen2);
    } else {
      console.warn(`  ⚠ could not find closing ); in ${rel}`);
    }
  } else {
    content =
      content.slice(0, lastParen) +
      `\n      </TemplateShell>` +
      content.slice(lastParen);
  }

  fs.writeFileSync(file, content);
  console.log(`  ✓ ${rel}`);
}

// Special case: food-noir/obsidian — inline bg needs CSS var override
const obsidianFile = path.join(BASE, "food-noir/obsidian/page.tsx");
let obs = fs.readFileSync(obsidianFile, "utf8");
if (!obs.includes("--slot-")) {
  // Replace: style={{ background: d.bg }}
  // With: style={{ backgroundImage: `var(--slot-${d.n}, none)`, background: d.bg, backgroundSize: 'cover', backgroundPosition: 'center' }}
  obs = obs.replace(
    /style=\{\{ background: d\.bg \}\}/,
    "style={{ backgroundImage: `var(--slot-${d.n}, none)`, background: d.bg, backgroundSize: 'cover', backgroundPosition: 'center' }}"
  );
  fs.writeFileSync(obsidianFile, obs);
  console.log(`  ✓ food-noir/obsidian (special: inline bg → CSS var)`);
}

console.log("\n✓ Done patching template pages.");
