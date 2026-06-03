// Texture dup-hash scanner.
// XUAT matches textures by the [HASH] in the filename, not the folder/sprite name.
// Same [HASH] in 2+ files = ambiguous (load-order decides which wins).
//   - byte-IDENTICAL  → redundant copy (safe to delete all but one)
//   - byte-DIFFERENT  → real conflict (a human must pick the correct one)
//
// Default = REPORT ONLY (writes to $GITHUB_STEP_SUMMARY, never deletes, exits 0).
// With `--apply` = deletes identical copies (keep lexicographically-first) + writes
//   TEXTURE-DUPS.md — used by the manual "open a PR via user token" flow.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const APPLY = process.argv.includes('--apply');
const TXROOTS = [
  'src/BepInEx/Translation/th/Texture',
  'src/BepInEx/Translation/en/Other/atlases',
  'src/BepInEx/Translation/en/Texture',
];
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const rel = f => f.split(path.sep).join('/').replace(/^src\/BepInEx\/Translation\//, '');

function walk(d) {
  let o = [];
  if (!fs.existsSync(d)) return o;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) o = o.concat(walk(p));
    else o.push(p);
  }
  return o;
}

const byHash = {};
for (const r of TXROOTS) for (const f of walk(r)) {
  const m = path.basename(f).match(/\[([0-9A-Fa-f-]+)\]/);
  if (m) (byHash[m[1]] = byHash[m[1]] || []).push(f);
}

const identical = [];  // {hash, keep, removable[]}
const conflict = [];   // {hash, files[]}
for (const [hash, files] of Object.entries(byHash)) {
  if (files.length < 2) continue;
  if (new Set(files.map(sha)).size === 1) {
    const sorted = files.slice().sort();
    identical.push({ hash, keep: rel(sorted[0]), removable: sorted.slice(1).map(rel), paths: sorted.slice(1) });
  } else {
    conflict.push({ hash, files: files.map(rel).sort() });
  }
}

const L = [];
L.push('# 🖼️ รายงานรูปซ้ำ (texture hash ซ้ำ)', '');
L.push('XUAT จับคู่รูปด้วย `[HASH]` ในชื่อไฟล์ ไม่สนโฟลเดอร์ — hash เดียวกัน 2 ไฟล์ = โหลดทับกัน', '');
const nRemovable = identical.reduce((s, g) => s + g.removable.length, 0);
L.push(`## ${APPLY ? '✅ ลบแล้ว' : '🟡 ลบได้ (byte ตรงกัน)'} — ${nRemovable} ไฟล์`, '');
if (nRemovable) for (const g of identical) for (const r of g.removable) L.push(`- \`${r}\` (เหมือน \`${g.keep}\` ที่เก็บไว้)`);
else L.push('ไม่มี');
L.push('', `## ⚠️ hash ขัดแย้ง (byte ต่างกัน) — ต้องคนตัดสิน — ${conflict.length} รายการ`, '');
if (conflict.length) for (const c of conflict) { L.push(`- \`[${c.hash}]\``); for (const f of c.files) L.push(`  - \`${f}\``); }
else L.push('ไม่มี');
const report = L.join('\n') + '\n';

console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
if (APPLY) {
  for (const g of identical) for (const p of g.paths) fs.rmSync(p);
  fs.writeFileSync('TEXTURE-DUPS.md', report);
  console.error(`applied: removed ${nRemovable} identical, ${conflict.length} conflicts remain`);
}
process.exit(0); // report-only — never block
