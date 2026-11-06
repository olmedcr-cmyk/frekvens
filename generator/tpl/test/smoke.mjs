// Compila los .tsx del registry con esbuild y renderiza cada componente en servidor (sin window).
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const React = require('react'), { renderToString } = require('react-dom/server');
const h = React.createElement;
const manifest = JSON.parse(fs.readFileSync('registry/frekvens/_manifest.json', 'utf8'));
const names = Object.keys(manifest).filter((k) => k !== '__lib');
const tmp = fs.mkdtempSync(path.join(process.cwd(), 'test/.tmp-'));
try {
  await build({ entryPoints: ['registry/frekvens/ui/index.ts'], bundle: true, format: 'cjs', platform: 'node', outfile: path.join(tmp, 'all.cjs'), external: ['react', 'react-dom'], loader: { '.css': 'empty' }, jsx: 'automatic', logLevel: 'warning' });
  const F = require(path.join(tmp, 'all.cjs'));
  const P = {
    Keypad: { keys: [{ label: 'A' }] }, Segmented: { options: ['a', 'b'] }, Select: { options: ['a', 'b'] }, Menu: { items: [{ label: 'a' }] }, Tabs: { tabs: [{ id: 'a', label: 'A' }] },
    Readout: { value: 1 }, Strip: { value: 1 }, ListRow: { title: 'x' }, TopBar: { title: 'x' }, Avatar: { name: 'Cris Olmedo', status: 'online' }, BarMeter: { data: [{ value: 1 }] }, LineChart: { data: [1, 2, 3] },
    LevelBars: { value: 0.5 }, Gauge: { value: 50 }, Timer: { duration: 60 }, Heatmap: { data: [1, 2, 3] }, Sparkline: { data: [1, 2] }, SplitBar: { segments: [{ label: 'a', value: 1 }] }, Ticker: { items: ['a'] },
    SplitFlap: { value: 'HOLA' }, FlapBoard: { rows: [{ time: '07:30', text: 'X', status: 'OK' }] }, DataTable: { columns: [{ key: 'a', label: 'A' }], rows: [{ id: 1, a: 'x' }] },
    Board: { columns: [{ id: 'a', title: 'A', items: [{ id: '1', title: 'x' }] }] }, Sortable: { items: [{ id: '1', title: 'x' }] }, AreaChart: { series: [{ label: 'a', data: [1, 2, 3] }] },
    Scatter: { points: [{ x: 1, y: 2 }, { x: 2, y: 3 }] }, RadarChart: { axes: ['a', 'b', 'c'], series: [{ label: 'a', data: [0.2, 0.5, 0.8] }] }, DonutChart: { segments: [{ label: 'a', value: 1 }] },
    RotarySelector: { options: ['a', 'b', 'c'] }, DotGrid: { total: 4, filled: 2 }, Sidebar: { sections: [{ items: [{ id: 'a', label: 'A' }] }] }, Render: { spec: { type: 'Text', props: {}, children: ['hola'] } },
    Message: { children: 'hola' }, Stat: { label: 'x', value: 1 }, UsageMeter: { label: 'x', used: 1, limit: 2 }, Timeline: { items: [{ title: 'x' }] }, Checklist: { items: [{ title: 'x' }] },
    ChoiceCards: { options: [{ value: 'a', label: 'A' }] }, RadioGroup: { options: [{ value: 'a', label: 'A' }] }, CardStack: { items: [{ title: 'x' }] }, Cabinet: { drawers: [{ title: 'x' }] }, Steps: { steps: ['a', 'b'] },
    Suggestions: { items: ['a'] }, TabBar: { items: [{ id: 'a', label: 'A', icon: 'home' }] }, Pager: { children: [h('div', { key: 1 }, 'a')] }, Deck: { children: [h('div', { key: 1 }, 'a')] }, DiscCarousel: { items: [{ title: 'a' }] },
    HourStrip: { data: [1, 2, 3] }, PaymentCard: { last4: '1234' }, Blueprint: { nodes: [{ id: 'a', x: 0, y: 0, w: 40, h: 40, title: 'A' }] }, Beam: { children: h('div', null, 'x') }, Tooltip: { label: 'x', children: h('button', null, 'x') },
  };
  let ok = 0; const fail = [];
  for (const n of names) { try { if (typeof F[n] !== 'function') throw new Error('no exportado'); renderToString(h(F[n], P[n] || {})); ok++; } catch (e) { fail.push(n + ': ' + e.message.split('\n')[0]); } }
  if (typeof F.parseLang !== 'function' || typeof F.applyTheme !== 'function') fail.push('faltan parseLang/applyTheme');
  console.log(`SSR: ${ok}/${names.length} componentes del registry compilan y renderizan en Node` + (fail.length ? '\n  ' + fail.join('\n  ') : ''));
  process.exitCode = fail.length ? 1 : 0;
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }
