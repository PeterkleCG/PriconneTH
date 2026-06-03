// Texture dup-hash scanner + auto-cleanup for the bot PR.
// XUAT matches textures by the [HASH] in the filename, not the folder/sprite name.
// Same [HASH] in 2+ files = ambiguous (load-order decides which wins).
//   - byte-IDENTICAL  → redundant copy → DELETE all but one (kept = lexicographically first)
//   - byte-DIFFERENT  → real conflict → DO NOT touch; list for a human to decide
// Writes a Thai report to TEXTURE-DUPS.md (+ deletes identical copies) so the bot PR
// carries both the cleanup diff and the pending-decision list.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
for (const r of TXROOTS) {
  for (const f of walk(r)) {
    const m = path.basename(f).match(/\[([0-9A-Fa-f-]+)\]/);
    if (!m) continue;
    (byHash[m[1]] = byHash[m[1]] || []).push(f);
  }
}

const deleted = [];   // {removed, kept}
const conflicts = []; // {hash, files[]}
for (const [hash, files] of Object.entries(byHash)) {
  if (files.length < 2) continue;
  // group by content hash
  const byContent = {};
  for (const f of files) (byContent[sha(f)] = byContent[sha(f)] || []).push(f);
  if (Object.keys(byContent).length === 1) {
    // all identical → keep first-sorted, delete rest
    const sorted = files.slice().sort();
    const keep = sorted[0];
    for (const f of sorted.slice(1)) { fs.rmSync(f); deleted.push({ removed: rel(f), kept: rel(keep) }); }
  } else {
    // bytes differ → conflict, leave for human
    conflicts.push({ hash, files: files.map(rel).sort() });
  }
}

const L = [];
L.push('# 🖼️ รายงานรูปซ้ำ (texture hash ซ้ำ)', '');
L.push('XUAT จับคู่รูปด้วย `[HASH]` ในชื่อไฟล์ ไม่สนโฟลเดอร์ — hash เดียวกัน 2 ไฟล์ = โหลดทับกัน (ลำดับตัดสินว่าตัวไหนชนะ)', '');
L.push(`## ✅ ลบสำเนาซ้ำ (byte ตรงกัน) — ${deleted.length} ไฟล์`, '');
if (deleted.length) {
  L.push('PR นี้ลบให้แล้ว (เก็บไฟล์เดียวพอ เพราะ content เหมือนกัน):', '');
  for (const d of deleted) L.push(`- ลบ \`${d.removed}\` (เหมือน \`${d.kept}\` ที่เก็บไว้)`);
} else L.push('ไม่มี', '');
L.push('', `## ⚠️ hash ขัดแย้ง (byte ต่างกัน) — ต้องคนตัดสิน — ${conflicts.length} รายการ`, '');
if (conflicts.length) {
  L.push('PR นี้**ไม่แตะ** — เลือกเองว่าตัวไหนถูก แล้วลบ/แก้ตัวที่เหลือ:', '');
  for (const c of conflicts) {
    L.push(`- \`[${c.hash}]\``);
    for (const f of c.files) L.push(`  - \`${f}\``);
  }
} else L.push('ไม่มี', '');

const report = L.join('\n') + '\n';
fs.writeFileSync('TEXTURE-DUPS.md', report);
console.log(`deleted ${deleted.length} identical, ${conflicts.length} conflicts need review`);
