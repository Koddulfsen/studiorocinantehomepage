// Converts: background: var(--slot-N, radial-gradient(...));
// To:       background-image: var(--slot-N, radial-gradient(...));
// This avoids the background shorthand resetting background-size/position.
const fs = require("fs");
const { execSync } = require("child_process");

const files = execSync('grep -rl "background: var(--slot" app/templates/')
  .toString().trim().split("\n").filter(Boolean);

let total = 0;
for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;
  content = content.replace(/background: (var\(--slot-\d+,)/g, "background-image: $1");
  if (content !== before) {
    fs.writeFileSync(file, content);
    const count = (before.match(/background: var\(--slot/g) || []).length;
    console.log(`  ✓ ${file} (${count} replaced)`);
    total += count;
  }
}
console.log(`\n✓ Done. ${total} replacements across ${files.length} files.`);
