// CI dup-key scanner for translation files.
// XUAT matches by KEY (not line) → duplicate keys across files with DIFFERENT
// values = load-order-dependent (silent breakage). Same-file dups = plain errors.
// Report-only: writes a Markdown report to $GITHUB_STEP_SUMMARY, always exits 0.
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

const sameFile = [], conflict = [];
let agree = 0;
for (const [k, arr] of Object.entries(keys)) {
  if (arr.length < 2) continue;
  const files = new Set(arr.map(a => a.file));
  if (files.size === 1) { sameFile.push([k, arr]); continue; }
  const vals = new Set(arr.map(a => a.value));
  if (vals.size > 1) conflict.push([k, arr]); else agree++;
}

const L = [];
L.push('# 🔑 Duplicate-key scan', '');
L.push(`| type | count |`, `|---|---|`);
L.push(`| same-file dups | ${sameFile.length} |`);
L.push(`| cross-file VALUE-CONFLICTS | ${conflict.length} |`);
L.push(`| cross-file value-agree (harmless) | ${agree} |`, '');
if (conflict.length) {
  L.push('## ⚠️ Value conflicts (key same, value differs — load-order risk)', '');
  for (const [k, arr] of conflict.slice(0, 60)) {
    L.push(`**\`${k}\`**`);
    for (const a of arr) L.push(`- \`${a.file}:${a.line}\` = ${a.value}`);
    L.push('');
  }
  if (conflict.length > 60) L.push(`… +${conflict.length - 60} more`, '');
}
if (sameFile.length) {
  L.push('## Same-file dups (duplicate line in one file)', '');
  for (const [k, arr] of sameFile) L.push(`- \`${k}\` → ${arr.map(a => a.file + ':' + a.line).join(', ')}`);
  L.push('');
}
if (!conflict.length && !sameFile.length) L.push('✅ No harmful dups (same-file / value-conflict).', '');

const report = L.join('\n');
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n');
// report-only — never block (admin commits land on main directly via web editor)
process.exit(0);
