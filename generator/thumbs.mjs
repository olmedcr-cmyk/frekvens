// Miniaturas del catálogo: una foto de la vista previa de cada componente, en claro y sin animación.
// Uso (desde la raíz del repo, con Chromium de Playwright instalado): npm run thumbs && npm run --prefix generator build
// Guarda en generator/thumbs/ (sobrevive a la regeneración); build.mjs las copia a public/thumbs/.
import pw from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'

const root = path.resolve('public')
const out = path.resolve('generator/thumbs')
const catalog = JSON.parse(fs.readFileSync('app/catalog.json', 'utf8'))
const apps = fs.readdirSync('public/preview').filter((f) => /^App[A-Z].*\.html$/.test(f)).map((f) => ({ name: f.replace('.html', ''), slug: 'app-' + f.slice(3).replace('.html', '').toLowerCase(), width: 438, max: 1400 }))
const only = process.argv.slice(2)
const WIDTH = 480, MAX_H = 1000

fs.mkdirSync(out, { recursive: true })
const types = { '.css': 'text/css', '.js': 'text/javascript', '.html': 'text/html', '.mp4': 'video/mp4' }
const srv = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]))
  if (!p.startsWith(root) || !fs.existsSync(p)) { res.statusCode = 404; return res.end() }
  res.setHeader('content-type', types[path.extname(p)] || 'application/octet-stream'); fs.createReadStream(p).pipe(res)
}).listen(0)
const port = srv.address().port

const manifestFile = path.join(out, 'manifest.json')
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {}
const b = await pw.chromium.launch()
const ctx = await b.newContext({ viewport: { width: WIDTH, height: 800 }, deviceScaleFactor: 2, reducedMotion: 'reduce', colorScheme: 'light' })
for (const c of [...catalog, ...apps]) {
  const W = c.width || WIDTH, MH = c.max || MAX_H
  if (only.length && !only.includes(c.slug)) continue
  for (let attempt = 1; attempt <= 2; attempt++) {
  const p = await ctx.newPage()
  try {
    await p.setViewportSize({ width: W, height: 800 })
    await p.goto(`http://localhost:${port}/preview/${c.name}.html`, { waitUntil: 'load', timeout: 20000 })
    await p.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); document.documentElement.style.background = '#fff'; document.body.style.background = '#fff' })
    await Promise.race([p.evaluate(() => document.fonts.ready), p.waitForTimeout(4000)])
    await p.waitForTimeout(1000)
    const h = Math.min(MH, Math.ceil(await p.evaluate(() => { let h = document.body.getBoundingClientRect().height; const root = document.getElementById('root'); const pad = (root && parseFloat(getComputedStyle(root).paddingBottom)) || 0; for (const el of document.querySelectorAll('#root *')) { const r = el.getBoundingClientRect(); if (r.width && r.height && r.bottom + pad > h) h = r.bottom + pad } return h })))
    await p.screenshot({ path: path.join(out, `${c.slug}.jpg`), type: 'jpeg', quality: 78, fullPage: true, clip: { x: 0, y: 0, width: W, height: h } })
    manifest[c.slug] = [W, h]
    process.stdout.write('.')
    await p.close(); break
  } catch (e) { console.log(`\n${c.slug} (intento ${attempt}): ${e.message.split('\n')[0]}`); await p.close() }
  }
}
await b.close(); srv.close()
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 1) + '\n')
console.log(`\n${Object.keys(manifest).length} miniaturas en generator/thumbs`)
