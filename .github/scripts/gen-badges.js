#!/usr/bin/env node
// Generate shields.io "endpoint" badge JSON from the GitHub API.
//
// Why endpoint JSON instead of native github/* shields badges:
// shields' github/* badges call the GitHub API through shields' OWN shared
// token pool, which is chronically rate-limited ("Unable to select next
// GitHub token from pool"). The endpoint badge type just renders a JSON we
// host in this repo — shields never touches the GitHub API for it, so it
// can never hit that error. We refresh the JSON daily via .github/workflows/badges.yml.
'use strict';

const fs = require('fs');
const path = require('path');

const REPO = process.env.REPO || process.env.GITHUB_REPOSITORY || 'PeterkleCG/PriconneTH';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
const COLOR = 'ff69b4';
const OUT_DIR = path.join(__dirname, '..', 'badges');

async function gh(endpoint) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'PriconneTH-badges',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`GitHub API ${endpoint} -> ${res.status} ${res.statusText}`);
  return res.json();
}

function compact(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function relativeDate(iso) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

function badge(label, message, color = COLOR) {
  return JSON.stringify({
    schemaVersion: 1,
    label,
    message: String(message),
    color,
    cacheSeconds: 3600,
  });
}

async function main() {
  const [owner, repo] = REPO.split('/');
  if (!owner || !repo) throw new Error(`Bad REPO: ${REPO}`);

  const info = await gh(`/repos/${owner}/${repo}`);
  const releases = await gh(`/repos/${owner}/${repo}/releases?per_page=100`);
  const commits = await gh(`/repos/${owner}/${repo}/commits?per_page=1`);

  // Total downloads across every asset of every release.
  let total = 0;
  for (const r of releases) for (const a of r.assets || []) total += a.download_count || 0;

  // Latest published release (prefer stable over prerelease), and its downloads.
  const published = releases.filter((r) => !r.draft);
  const stable = published.find((r) => !r.prerelease) || published[0];
  let latestTag = '';
  let latestDl = 0;
  if (stable) {
    latestTag = stable.tag_name || '';
    for (const a of stable.assets || []) latestDl += a.download_count || 0;
  }

  const lastCommitDate =
    commits[0] && commits[0].commit
      ? commits[0].commit.committer?.date || commits[0].commit.author?.date
      : null;

  const spdx = info.license && info.license.spdx_id;
  const license = spdx && spdx !== 'NOASSERTION' ? spdx : (info.license?.name || 'unknown');

  const files = {
    'release.json': badge('release', latestTag || 'none'),
    'downloads.json': badge('downloads', compact(total)),
    'latest.json': badge('latest', compact(latestDl)),
    'stars.json': badge('stars', compact(info.stargazers_count || 0)),
    'last-commit.json': badge('last commit', lastCommitDate ? relativeDate(lastCommitDate) : 'unknown'),
    'license.json': badge('license', license),
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(OUT_DIR, name), content + '\n');
    console.log(`${name}: ${content}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
