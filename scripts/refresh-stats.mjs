// Refreshes the commit counts inside <!--stats:KEY-->...<!--/stats:KEY--> markers in README.md.
// Node 20+, no dependencies. Needs GH_TOKEN with Contents:Read on every listed repo.

import { readFile, writeFile } from 'node:fs/promises';

const TOKEN = process.env.GH_TOKEN;
if (!TOKEN) { console.error('GH_TOKEN is not set'); process.exit(1); }

const api = async (path) => {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'profile-readme-stats',
    },
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${res.statusText}`);
  return res;
};

// Cheapest way to count commits: ask for one per page and read the last page number.
const commitCount = async (repo) => {
  const res = await api(`/repos/${repo}/commits?per_page=1`);
  const link = res.headers.get('link');
  if (link) {
    const last = link.split(',').find((p) => p.includes('rel="last"'));
    if (last) {
      const n = last.match(/[?&]page=(\d+)/);
      if (n) return Number(n[1]);
    }
  }
  return (await res.json()).length; // 0 or 1 commit
};

const { projects } = JSON.parse(await readFile(new URL('./projects.json', import.meta.url), 'utf8'));

let readme = await readFile('README.md', 'utf8');
let changed = 0;
const problems = [];

for (const { key, repo } of projects) {
  const open = `<!--stats:${key}-->`;
  const close = `<!--/stats:${key}-->`;
  const start = readme.indexOf(open);
  const end = readme.indexOf(close);
  if (start === -1 || end === -1) { problems.push(`${key}: no markers in README.md`); continue; }

  let count;
  try { count = await commitCount(repo); }
  catch (e) { problems.push(`${key}: ${e.message}`); continue; }

  const current = readme.slice(start + open.length, end);
  const next = `${count} commits`;
  if (current !== next) {
    readme = readme.slice(0, start + open.length) + next + readme.slice(end);
    console.log(`${key}: ${current || '(empty)'} -> ${next}`);
    changed++;
  } else {
    console.log(`${key}: unchanged (${next})`);
  }
}

if (changed) await writeFile('README.md', readme);
if (problems.length) { console.error('\nProblems:\n' + problems.map((p) => ' - ' + p).join('\n')); process.exit(1); }
console.log(changed ? `\nUpdated ${changed} block(s).` : '\nNothing to update.');
