// CI dup-key scanner — reports ONLY the serious case:
// same JP key with 2+ DIFFERENT Thai values (load-order decides which wins = wrong).
// Same-key-same-value dups are harmless (ignored) — keep-on-purpose is fine.
// Report-only: writes Markdown to $GITHUB_STEP_SUMMARY, always exits 0.
const fs = require('fs');
const path = require('path');

const ROOT = 'src/BepInEx/Translation/th/Text';
const stripMeta = v => v.replace(/\s*##[^#]*##\s*/g, '').trim();
const short = p => p.replace(/\\/g, '/').replace(/^.*\/th\/Text\//, '');

function walk(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.txt')) out.push(p);
  }
  return out;
}

const keys = {};
for (const f of walk(ROOT)) {
  const base = path.basename(f);
  if (base.endsWith('.font.txt') || base.endsWith('.resizer.txt')) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const k = line.slice(0, eq);
    if (k.startsWith('r:') || k.startsWith('sr:')) continue;
    (keys[k] = keys[k] || []).push({ file: short(f), line: i + 1, value: stripMeta(line.slice(eq + 1)) });
  }
}

// serious = same JP key, 2+ DISTINCT Thai values (same-file or cross-file)
const conflicts = [];
for (const [k, arr] of Object.entries(keys)) {
  if (arr.length < 2) continue;
  if (new Set(arr.map(a => a.value)).size > 1) conflicts.push([k, arr]);
}

const L = [];
L.push('# 🔑 Conflicting translations — same JP key, different Thai', '');
L.push(`**${conflicts.length}** key(s) have 2+ different Thai values (load-order decides which wins — review needed).`, '');
for (const [k, arr] of conflicts) {
  L.push(`**\`${k}\`**`);
  for (const a of arr) L.push(`- \`${a.file}:${a.line}\` = ${a.value}`);
  L.push('');
}
if (!conflicts.length) L.push('✅ No conflicting translations — every duplicated JP key resolves to one Thai value.', '');

const report = L.join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n');
process.exit(0); // report-only — never block
