// Monta el repositorio "frekvens" (shadcn-style registry) a partir del sistema de diseño.
// node build.mjs <repoDir>
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PRJ = path.resolve(HERE, 'source/project');
const REPO = path.resolve(process.argv[2] || path.join(HERE, '..'));
const SRC = path.join(HERE, '.out');
const VERSION = '0.1.0';
const HOME = (process.env.FREKVENS_URL || 'https://frekvens-ui.vercel.app').replace(/\/$/, ''); // dónde se sirve /r: FREKVENS_URL=https://tu-dominio npm run build

const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const kebab = (s) => s.replace(/([a-z])([A-Z0-9])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();

// 1. Partir el bundle
execSync(`node ${path.join(HERE, 'split.mjs')} ${PRJ}/components/bundle.js ${PRJ}/components/index.d.ts ${SRC}`, { stdio: 'inherit' });
const manifest = JSON.parse(read(path.join(SRC, '_manifest.json')));
const names = Object.keys(manifest).filter((k) => k !== '__lib');

// 2. CSS: tokens (@theme para Tailwind v4 + variables) y componentes en @layer
const t = JSON.parse(read(path.join(PRJ, 'tokens.json')));
const val = (v, th) => (typeof v === 'string' ? v : v[th] || v.light);
const cv = (x) => { const m = /^\{(.+)\}$/.exec(x); return m ? `var(--${m[1]})` : x; };
const themeVars = (th) => [...t.color.tokens.map((k) => `  --${k.name}: ${cv(val(k.value, th))};`), ...t.shadow.tokens.map((k) => `  --${k.name}: ${val(k.value, th)};`)].join('\n');
const staticVars = [...['spacing', 'radius', 'grid', 'duration', 'ease'].flatMap((f) => t[f].tokens.map((k) => `  --${k.name}: ${k.value};`)), ...Object.entries(t.type.families).map(([k, v]) => `  --font-${k}: ${v};`)].join('\n');
// Tailwind v4 @theme: expone los tokens como utilidades (bg-klein, text-ink, rounded-lg…)
const tw = [
  ...t.color.tokens.map((k) => `  --color-${k.name}: var(--${k.name});`),
  ...t.radius.tokens.map((k) => `  --radius-${k.name.replace('radius-', '')}: var(--${k.name});`),
  ...Object.entries(t.type.families).map(([k]) => `  --font-${k}: var(--font-${k});`),
  ...t.ease.tokens.map((k) => `  --ease-${k.name.replace('ease-', '')}: var(--${k.name});`),
  ...t.duration.tokens.filter((k) => k.name.startsWith('dur-')).map((k) => `  --duration-${k.name.replace('dur-', '')}: var(--${k.name});`),
  ...t.shadow.tokens.map((k) => `  --shadow-${k.name.replace('shadow-', '')}: var(--${k.name});`),
].join('\n');
const tokensCss = `/* Frekvens — tokens. Generado desde tokens.json. */
:root, [data-theme="light"] {
  color-scheme: light;
${themeVars('light')}
}
[data-theme="dark"] {
  color-scheme: dark;
${themeVars('dark')}
}
:root {
${staticVars}
}
`;
const twTheme = `/* Frekvens para Tailwind v4: importa este archivo después de "tailwindcss" y tendrás bg-klein, text-ink, rounded-xl, ease-settle… */
@import "./tokens.css";
@theme inline {
${tw}
}
`;
let comp = read(path.join(PRJ, 'components/bundle.css')).replace(/^@import[^\n]*\n/gm, '');
// body global → clase opcional, para no pisar el reset del proyecto anfitrión
comp = comp.replace(/^body \{ margin: 0; font-family: var\(--font-sans\); background: var\(--paper\); color: var\(--ink\); -webkit-font-smoothing: antialiased; \}/m, '.frk-body, body[data-frekvens] { margin: 0; font-family: var(--font-sans); background: var(--paper); color: var(--ink); -webkit-font-smoothing: antialiased; }');
const compCss = `/* Frekvens — componentes. Vive en @layer components, así que tus utilidades de Tailwind ganan siempre. */\n@layer components {\n${comp}\n}\n`;
const fontsCss = `@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=Doto:wght@700;800;900&family=IBM+Plex+Mono:wght@500&display=swap');\n`;
const allCss = `${fontsCss}@import "./tokens.css";\n@import "./components.css";\n`;

// 3. Estructura del repo
const R = (p) => path.join(REPO, p);
for (const f of fs.existsSync(REPO) ? fs.readdirSync(REPO) : []) if (!['node_modules', '.git', '.next', '.vercel', 'generator', 'CLAUDE.md', 'HANDOFF.md', 'package-lock.json'].includes(f)) fs.rmSync(path.join(REPO, f), { recursive: true, force: true });
for (const f of fs.readdirSync(SRC)) if (f.endsWith('.tsx') || f.endsWith('.ts')) write(R(`registry/frekvens/ui/${f}`), read(path.join(SRC, f)));
write(R('registry/frekvens/ui/frekvens.css'), allCss);
write(R('registry/frekvens/ui/tokens.css'), tokensCss);
write(R('registry/frekvens/ui/components.css'), compCss);
write(R('registry/frekvens/ui/tailwind.css'), twTheme);
write(R('registry/frekvens/ui/fonts.css'), fontsCss);
write(R('registry/frekvens/lib/theme.ts'), `/** Pone el tema en <html>. 'auto' sigue al sistema y escucha sus cambios. */
let mq: MediaQueryList | null = null, fn: (() => void) | null = null
export function applyTheme(mode: 'light' | 'dark' | 'auto', root: HTMLElement = document.documentElement) {
  if (typeof document === 'undefined') return
  if (mq && fn) { mq.removeEventListener('change', fn); mq = null; fn = null }
  if (mode === 'auto') {
    mq = window.matchMedia('(prefers-color-scheme: dark)')
    fn = () => root.setAttribute('data-theme', mq!.matches ? 'dark' : 'light')
    fn(); mq.addEventListener('change', fn); return
  }
  root.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light')
}
`);
write(R('registry/frekvens/ui/index.ts'), names.map((n) => `export * from "./${kebab(n)}"`).join('\n') + '\nexport type * from "./types"\nexport { parseLang } from "./lib"\nexport { applyTheme } from "../lib/theme"\n');


// Render: el catálogo con el que pinta. catalog.ts importa todo; `components` permite pasar otro.
{
  const rp = R('registry/frekvens/ui/render.tsx'); let rs = read(rp);
  rs = rs.replace('import { cx, parseLang } from "./lib"', 'import { cx, parseLang } from "./lib"\nimport { CATALOG } from "./catalog"');
  rs = rs.replace(/var C(: any)? = api\[n\.type\]/, 'var C: any = (p.components || CATALOG)[n.type]');
  rs = rs.replace('export interface RenderProps {', 'export interface RenderProps {\n  /** Catálogo de componentes con el que pintar (por defecto, todo Frekvens). */\n  components?: Record<string, React.ComponentType<any>>');
  write(rp, rs);
  const cat = names.filter((n) => n !== 'Render').map((n) => `import { ${n} } from "./${kebab(n)}"`).join('\n') + `\n\n/** Todos los componentes de Frekvens por nombre: lo que \`Render\` acepta de un modelo. */\nexport const CATALOG: Record<string, React.ComponentType<any>> = { ${names.filter((n) => n !== 'Render').join(', ')} }\n`;
  write(R('registry/frekvens/ui/catalog.ts'), `import type * as React from "react"\n` + cat);
  manifest.Render.deps = names.filter((n) => n !== 'Render');
}

// 4. registry.json + un item por componente (esquema shadcn)
const docOf = (n) => { const p = path.join(PRJ, 'components', n, 'README.md'); return fs.existsSync(p) ? read(p) : ''; };
const firstLine = (md) => (md.split('\n').find((l) => l && !l.startsWith('#')) || '').replace(/`/g, '').slice(0, 200);
const groupOf = (n) => { const p = path.join(PRJ, 'components', n, 'preview.html'); if (!fs.existsSync(p)) return 'Otros'; const m = /group="([^"]+)"/.exec(read(p)); return m ? m[1] : 'Otros'; };
const items = [];
const cssItem = { name: 'frekvens-styles', type: 'registry:style', title: 'Estilos de Frekvens', description: 'Tokens (claro/oscuro), componentes en @layer y tema para Tailwind v4.', files: ['frekvens.css', 'tokens.css', 'components.css', 'tailwind.css', 'fonts.css'].map((f) => ({ path: `registry/frekvens/ui/${f}`, type: 'registry:file', target: `~/styles/frekvens/${f}` })), docs: 'Importa styles/frekvens/frekvens.css (o tailwind.css si usas Tailwind v4) en tu CSS global y pon data-theme en <html>.' };
const libItem = { name: 'frekvens-lib', type: 'registry:lib', title: 'Frekvens · utilidades', description: 'cx, useValue, useFollow (muelle con impulso), iconos, parseLang y lo que comparten los componentes.', registryDependencies: [`${HOME}/r/frekvens-styles.json`], files: [{ path: 'registry/frekvens/ui/lib.tsx', type: 'registry:lib', target: '~/components/frekvens/lib.tsx' }, { path: 'registry/frekvens/ui/types.ts', type: 'registry:lib', target: '~/components/frekvens/types.ts' }, { path: 'registry/frekvens/lib/theme.ts', type: 'registry:lib', target: '~/components/frekvens/theme.ts' }] };
items.push(cssItem, libItem);
for (const n of names) {
  const m = manifest[n];
  items.push({ name: kebab(n), type: 'registry:ui', title: n, description: firstLine(docOf(n)), categories: [groupOf(n)], dependencies: [], registryDependencies: [`${HOME}/r/frekvens-lib.json`, ...m.deps.map((d) => `${HOME}/r/${kebab(d)}.json`)], files: [{ path: `registry/frekvens/ui/${m.file}`, type: 'registry:ui', target: `~/components/frekvens/${m.file}` }, ...(n === 'Render' ? [{ path: 'registry/frekvens/ui/catalog.ts', type: 'registry:ui', target: '~/components/frekvens/catalog.ts' }] : [])], docs: docOf(n) });
}
items.push({ name: 'frekvens', type: 'registry:ui', title: 'Frekvens completo', description: 'Los 114 componentes, los estilos y las utilidades de una vez.', registryDependencies: names.map((n) => `${HOME}/r/${kebab(n)}.json`), files: [{ path: 'registry/frekvens/ui/index.ts', type: 'registry:ui', target: '~/components/frekvens/index.ts' }] });
const registry = { $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'frekvens', homepage: HOME, items };
write(R('registry.json'), JSON.stringify(registry, null, 2));
// salida estática /r/<name>.json (lo que `npx shadcn add <url>` lee)
for (const it of items) {
  const out = { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...it, files: it.files.map((f) => ({ ...f, content: read(R(f.path)) })) };
  write(R(`public/r/${it.name}.json`), JSON.stringify(out, null, 1));
}
write(R('public/r/registry.json'), JSON.stringify(registry, null, 1));

// 5. package.json raíz, config, licencia, docs
write(R('package.json'), JSON.stringify({
  name: 'frekvens', version: VERSION, private: true, type: 'module', license: 'MIT',
  description: 'Frekvens: componentes React para copiar y pegar, al estilo shadcn/ui. Botoneras grandes, puntos, instrumentos, conversación e IA.',
  scripts: { dev: 'next dev', build: 'next build', start: 'next start', 'registry:build': 'shadcn build', test: 'tsc -p tsconfig.registry.json && node test/smoke.mjs && node test/registry.mjs', 'test:a11y': 'node test/a11y.mjs' },
  dependencies: { next: '15.5.29', react: '18.3.1', 'react-dom': '18.3.1' },
  devDependencies: { '@tailwindcss/postcss': '4.0.17', '@types/node': '22.10.2', '@types/react': '18.3.18', '@types/react-dom': '18.3.5', 'axe-core': '4.10.2', esbuild: '0.24.0', playwright: '1.49.1', shadcn: '2.3.0', tailwindcss: '4.0.17', typescript: '5.7.2' },
}, null, 2) + "\n");
write(R('components.json'), JSON.stringify({ $schema: 'https://ui.shadcn.com/schema.json', style: 'new-york', rsc: true, tsx: true, tailwind: { config: '', css: 'app/globals.css', baseColor: 'neutral', cssVariables: true }, aliases: { components: '@/components', utils: '@/lib/utils', ui: '@/components/ui', lib: '@/lib', hooks: '@/hooks' }, registries: { '@frekvens': `${HOME}/r/{name}.json` } }, null, 2));
write(R('tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2020', lib: ['dom', 'dom.iterable', 'esnext'], allowJs: true, skipLibCheck: true, strict: true, noEmit: true, esModuleInterop: true, module: 'esnext', moduleResolution: 'bundler', resolveJsonModule: true, isolatedModules: true, jsx: 'preserve', incremental: true, plugins: [{ name: 'next' }], paths: { '@/*': ['./*'] } }, include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'], exclude: ['node_modules', 'generator'] }, null, 2));
write(R('next.config.mjs'), `/** @type {import('next').NextConfig} */\nconst nextConfig = { reactStrictMode: true }\nexport default nextConfig\n`);
write(R('postcss.config.mjs'), `export default { plugins: { '@tailwindcss/postcss': {} } }\n`);
write(R('.gitignore'), 'node_modules\n.next\nout\n*.tgz\n.DS_Store\ntest/shots\n.vercel\n');
write(R('LICENSE'), `MIT License\n\nCopyright (c) 2026 Cris Olmedo\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n`);
write(R('NOTICE.md'), `# Avisos\n\n- El muelle con impulso de \`useFollow\` (Segmented, Tabs) y las curvas \`ease-settle\` / \`ease-press\` vienen de *stageshow* (github.com/benjitaylor/skills), MIT © 2026 Benji Taylor.\n- Las fuentes Archivo, Doto e IBM Plex Mono son de Google Fonts (OFL).\n- "Frekvens" es también el nombre de una colección de IKEA; este proyecto no tiene relación con IKEA.\n`);
// docs
fs.mkdirSync(R('docs'), { recursive: true });
for (const f of fs.readdirSync(PRJ)) if (f.endsWith('.md')) fs.copyFileSync(path.join(PRJ, f), R(`docs/${f}`));
fs.mkdirSync(R('docs/componentes'), { recursive: true });
for (const n of names) if (fs.existsSync(path.join(PRJ, 'components', n, 'README.md'))) fs.copyFileSync(path.join(PRJ, 'components', n, 'README.md'), R(`docs/componentes/${kebab(n)}.md`));
// previews originales (para la web y las pruebas)
for (const n of fs.readdirSync(path.join(PRJ, 'components'))) { const p = path.join(PRJ, 'components', n, 'preview.html'); if (fs.existsSync(p)) write(R(`previews/${n}.html`), read(p)); }
fs.copyFileSync(path.join(PRJ, 'tokens.json'), R('registry/frekvens/tokens.json'));
fs.copyFileSync(path.join(PRJ, 'frekvens.schema.json'), R('public/frekvens.schema.json'));
write(R('registry/frekvens/_manifest.json'), JSON.stringify(manifest, null, 1));


// 6. Vistas previas vivas (iframe): el bundle clásico + los previews originales, en /public/preview
const LIB = path.resolve(HERE, 'source/lib');
write(R('public/preview/react.js'), read(path.join(LIB, 'react.js')));
write(R('public/preview/react-dom.js'), read(path.join(LIB, 'react-dom.js')));
write(R('public/preview/frekvens.js'), read(path.join(PRJ, 'components/bundle.js')));
write(R('public/preview/frekvens.css'), fontsCss + tokensCss + '\n' + comp);
for (const n of fs.readdirSync(path.join(PRJ, 'components'))) {
  const p = path.join(PRJ, 'components', n, 'preview.html'); if (!fs.existsSync(p)) continue;
  let html = read(p).replace(/^<!-- @dsCard[^\n]*\n/, '');
  html = html.replace('<head>', `<head><link rel="stylesheet" href="/preview/frekvens.css"><script src="/preview/react.js"></script><script src="/preview/react-dom.js"></script><script src="/preview/frekvens.js"></script><script>try{if(parent!==window){var t=parent.document.documentElement.getAttribute('data-theme');if(t)document.documentElement.setAttribute('data-theme',t);new MutationObserver(function(){document.documentElement.setAttribute('data-theme',parent.document.documentElement.getAttribute('data-theme'))}).observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']})}}catch(e){}</script>`);
  html = html.replace('/_blob/79d841c39ba002deb38253799d557231', '/preview/frekvens-demo.mp4');
  write(R(`public/preview/${n}.html`), html);
}
const mp4 = path.join(PRJ, 'assets/Media/frekvens-demo.mp4'); if (fs.existsSync(mp4)) fs.copyFileSync(mp4, R('public/preview/frekvens-demo.mp4'));

// plantillas (app Next, pruebas, README, CI)
const TPL = path.join(HERE, 'tpl');
const copyDir = (a, b) => { for (const f of fs.readdirSync(a)) { const s = path.join(a, f), d = path.join(b, f); if (fs.statSync(s).isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); } else fs.copyFileSync(s, d); } };
if (fs.existsSync(TPL)) copyDir(TPL, REPO);
// catálogo para la web
write(R('app/catalog.json'), JSON.stringify(names.map((n) => ({ name: n, slug: kebab(n), group: groupOf(n), description: firstLine(docOf(n)), deps: manifest[n].deps.map((d) => ({ name: d, slug: kebab(d) })), doc: docOf(n) })), null, 1));
console.log('repo en', REPO, '·', names.length, 'componentes ·', items.length, 'items en el registry');
