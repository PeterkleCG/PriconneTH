#!/usr/bin/env node
// Regenerate CHANGELOG.md from release-notes/<tag>.md (newest first).
//
// release-notes/*.md use "•" bullets + single newlines (which render on the
// GitHub Releases page via <br>). A .md changelog needs real Markdown list
// items ("- ") so the lines break. This converts one form to the other.
//
// Run by .github/workflows/version-sync.yml on each version tag.
'use strict';

const fs = require('fs');
const path = require('path');

const REPO = process.env.REPO || 'PeterkleCG/PriconneTH';
const DIR = path.join(__dirname, '..', '..', 'release-notes');
const OUT = path.join(__dirname, '..', '..', 'CHANGELOG.md');

const files = fs.readdirSync(DIR).filter((f) => /^v\d+\.\d+\.\d+\.md$/.test(f));
files.sort((a, b) => {
  const pa = a.replace(/^v|\.md$/g, '').split('.').map(Number);
  const pb = b.replace(/^v|\.md$/g, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) if (pb[i] !== pa[i]) return pb[i] - pa[i];
  return 0;
});

let out = `# Changelog\n\nดูรายละเอียดแต่ละเวอร์ชั่นพร้อมไฟล์ดาวน์โหลดที่ [**Releases**](https://github.com/${REPO}/releases)\n\n`;
for (const f of files) {
  const lines = fs.readFileSync(path.join(DIR, f), 'utf8').trim().split(/\r?\n/);
  const ver = lines[0].trim();
  const bullets = [];
  let full = '';
  for (let i = 1; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l || /^changelog$/i.test(l)) continue;
    if (l.startsWith('•')) bullets.push('- ' + l.replace(/^•\s*/, ''));
    else if (l.startsWith('Full Changelog')) full = l;
    else bullets.push('- ' + l);
  }
  out += '## ' + ver + '\n\n' + bullets.join('\n') + '\n' + (full ? '\n' + full + '\n' : '') + '\n';
}

fs.writeFileSync(OUT, out);
console.log(`CHANGELOG.md regenerated from ${files.length} release notes`);
