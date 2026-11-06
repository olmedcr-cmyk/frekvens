// Comprueba que cada item de /public/r resuelve sus dependencias y que su código es el del repo.
import fs from 'node:fs';
const reg = JSON.parse(fs.readFileSync('public/r/registry.json', 'utf8'));
const have = new Set(reg.items.map((i) => i.name));
let bad = 0;
for (const it of reg.items) {
  const item = JSON.parse(fs.readFileSync(`public/r/${it.name}.json`, 'utf8'));
  for (const d of item.registryDependencies || []) { const n = d.split('/').pop().replace(/\.json$/, ''); if (!have.has(n)) { console.log(`✗ ${it.name}: depende de ${n}, que no existe`); bad++; } }
  for (const f of item.files) { if (!f.content || !f.target) { console.log(`✗ ${it.name}: ${f.path} sin content/target`); bad++; } else if (fs.readFileSync(f.path, 'utf8') !== f.content) { console.log(`✗ ${it.name}: ${f.path} desactualizado (ejecuta la build)`); bad++; } }
}
console.log(`Registry: ${reg.items.length} items, ${bad ? bad + ' problemas' : 'todo resuelve'}`);
process.exitCode = bad ? 1 : 0;
