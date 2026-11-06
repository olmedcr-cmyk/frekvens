// axe-core sobre todas las vistas previas, en claro y oscuro. Necesita `npx playwright install chromium`.
import pw from 'playwright';
const { chromium } = pw;
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const root = path.resolve('public');
const srv = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(req.url.split('?')[0])); if (!p.startsWith(root) || !fs.existsSync(p)) { res.statusCode = 404; return res.end(); } res.setHeader('content-type', p.endsWith('.css') ? 'text/css' : p.endsWith('.js') ? 'text/javascript' : p.endsWith('.html') ? 'text/html' : 'application/octet-stream'); fs.createReadStream(p).pipe(res); }).listen(0);
const port = srv.address().port;
const b = await chromium.launch(); let total = 0, pages = 0;
for (const f of fs.readdirSync(path.join(root, 'preview')).filter((f) => f.endsWith('.html'))) for (const theme of ['light', 'dark']) {
  const p = await b.newPage({ viewport: { width: 960, height: 900 } });
  await p.route(/fonts\.googleapis|fonts\.gstatic/, (r) => r.abort());
  await p.goto(`http://localhost:${port}/preview/${f}`); await p.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme); await p.waitForTimeout(350);
  await p.addScriptTag({ content: axe });
  const v = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] }, rules: { region: { enabled: false }, 'landmark-one-main': { enabled: false }, 'page-has-heading-one': { enabled: false } } })).violations.filter((x) => x.impact !== 'minor').map((x) => x.id + ': ' + x.nodes[0].target[0]));
  if (v.length) { console.log(`## ${f} (${theme})`); v.forEach((x) => console.log('  ', x)); total += v.length; }
  pages++; await p.close();
}
await b.close(); srv.close();
console.log(`axe: ${pages} páginas, ${total} infracciones`);
process.exitCode = total ? 1 : 0;
