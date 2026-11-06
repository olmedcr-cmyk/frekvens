// Parte el bundle clásico de Frekvens en un archivo .tsx por componente (JSX, props tipadas)
// + lib.tsx con lo compartido. Uso: node split.mjs <bundle.js> <index.d.ts> <outDir>
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import * as t from '@babel/types';
import prettier from 'prettier';
const traverse = _traverse.default, generate = _generate.default;

const [, , BUNDLE, DTS, OUT] = process.argv;
const src = fs.readFileSync(BUNDLE, 'utf8').replace(/^\/\* @ds-bundle: .*? \*\/\n/, '');
const dts = fs.readFileSync(DTS, 'utf8');
const ast = parse(src, { sourceType: 'script' });
const iife = ast.program.body[0].expression.callee.body.body;

// ---- 1. Declaraciones de primer nivel ----
const decls = []; // {names, node, kind}
let apiNames = [];
const REACTVARS = new Set(['R', 'h', 'useState', 'useRef', 'useEffect', 'useId']);
for (const st of iife) {
  if (t.isFunctionDeclaration(st)) decls.push({ names: [st.id.name], node: st });
  else if (t.isVariableDeclaration(st)) {
    for (const d of st.declarations) {
      const n = d.id.name;
      if (n === 'api') { apiNames = d.init.properties.map((p) => p.key.name); continue; }
      if (REACTVARS.has(n)) continue;
      decls.push({ names: [n], node: t.variableDeclaration('var', [d]) });
    }
  } else if (t.isExpressionStatement(st)) {
    const e = st.expression;
    if (t.isAssignmentExpression(e) && t.isMemberExpression(e.left)) {
      let o = e.left.object; while (t.isMemberExpression(o)) o = o.object;
      if (t.isIdentifier(o) && (o.name === 'api' || o.name === 'window')) continue;
      decls.push({ names: [], owner: o.name, node: st });
    } else decls.push({ names: [], node: st });
  }
}
const top = new Map(); decls.forEach((d) => d.names.forEach((n) => top.set(n, d)));
// asignaciones X.prop = ... van con X
for (const d of decls) if (d.owner && top.has(d.owner)) { const o = top.get(d.owner); (o.extra ||= []).push(d.node); d.skip = true; }

// ---- 2. Referencias ----
function refsOf(node) {
  const file = t.file(t.program([t.cloneNode(node, true)]));
  const s = new Set();
  traverse(file, { Identifier(p) { if (p.isReferencedIdentifier() && top.has(p.node.name) && !p.scope.hasBinding(p.node.name, true)) s.add(p.node.name); if (p.isReferencedIdentifier() && REACTVARS.has(p.node.name)) s.add('@' + p.node.name); } });
  return s;
}
for (const d of decls) { if (d.skip) continue; d.refs = refsOf(d.node); for (const x of d.extra || []) refsOf(x).forEach((r) => d.refs.add(r)); }

const comps = new Set(apiNames.filter((n) => top.has(n)));
// un ayudante que (transitivamente) usa un componente no puede vivir en lib: va con su primer usuario
const helpers = decls.filter((d) => !d.skip && d.names.length && !comps.has(d.names[0]));
const usesComp = new Map();
function tainted(d, seen = new Set()) {
  if (usesComp.has(d)) return usesComp.get(d);
  if (seen.has(d)) return false; seen.add(d);
  let r = false; for (const x of d.refs) { if (x[0] === '@') continue; if (comps.has(x)) r = true; else { const dd = top.get(x); if (dd && !comps.has(dd.names[0]) && tainted(dd, seen)) r = true; } }
  usesComp.set(d, r); return r;
}
const home = new Map(); // helper name -> component file que lo contiene
for (const hd of helpers) if (tainted(hd)) {
  const users = decls.filter((d) => !d.skip && d.names.length && comps.has(d.names[0]) && d.refs.has(hd.names[0])).map((d) => d.names[0]);
  home.set(hd.names[0], users[0] || null);
}

// ---- 3. JSX ----
function toJSXName(e) { if (t.isStringLiteral(e)) return t.jsxIdentifier(e.value); if (t.isIdentifier(e) && /^[A-Z]/.test(e.name)) return t.jsxIdentifier(e.name); if (t.isMemberExpression(e) && !e.computed && t.isIdentifier(e.object) && t.isIdentifier(e.property)) return t.jsxMemberExpression(t.jsxIdentifier(e.object.name), t.jsxIdentifier(e.property.name)); return null; }
const SAFE_ATTR = /^[^"\\\n{}<>&]*$/;
function attrs(p) {
  if (!p || t.isNullLiteral(p) || (t.isIdentifier(p) && p.name === 'undefined')) return [];
  if (!t.isObjectExpression(p)) return [t.jsxSpreadAttribute(p)];
  const out = [];
  for (const pr of p.properties) {
    if (t.isSpreadElement(pr)) { out.push(t.jsxSpreadAttribute(pr.argument)); continue; }
    if (!t.isObjectProperty(pr) || pr.computed) return [t.jsxSpreadAttribute(p)];
    const k = t.isIdentifier(pr.key) ? pr.key.name : t.isStringLiteral(pr.key) ? pr.key.value : null;
    if (!k || !/^[A-Za-z_][\w:-]*$/.test(k)) return [t.jsxSpreadAttribute(p)];
    const v = pr.value;
    const val = t.isStringLiteral(v) && SAFE_ATTR.test(v.value) ? t.stringLiteral(v.value) : t.jsxExpressionContainer(v);
    out.push(t.jsxAttribute(t.jsxIdentifier(k), val));
  }
  return out;
}
const SAFE_TXT = /^[^{}<>&\n]*\S[^{}<>&\n]*$/;
function child(c) { if (t.isStringLiteral(c) && SAFE_TXT.test(c.value) && c.value === c.value.trim()) return t.jsxText(c.value); if (t.isJSXElement(c)) return c; return t.jsxExpressionContainer(c); }
function jsxify(file) {
  traverse(file, { CallExpression: { exit(p) {
    const c = p.node.callee;
    const isH = (t.isIdentifier(c, { name: 'h' }) && !p.scope.hasBinding('h', true)) || (t.isMemberExpression(c) && t.isIdentifier(c.object, { name: 'R' }) && t.isIdentifier(c.property, { name: 'createElement' }));
    if (!isH || !p.node.arguments.length) return;
    const [tag, props, ...kids] = p.node.arguments;
    const nm = toJSXName(tag);
    if (!nm || kids.some((k) => t.isSpreadElement(k))) return;
    const open = t.jsxOpeningElement(nm, attrs(props), kids.length === 0);
    const close = kids.length ? t.jsxClosingElement(t.cloneNode(nm)) : null;
    p.replaceWith(t.jsxElement(open, close, kids.map(child), kids.length === 0));
  } } });
}

// ---- 4. Tipos desde index.d.ts ----
function propsDecl(name) {
  const re = new RegExp(`export interface ${name}Props[\\s\\S]*?\\n(?=export |\\n|/\\*)`, 'm');
  const m = dts.match(re); return m ? m[0].trim() : null;
}
// interfaces auxiliares (KeypadKey, BoardItem…) que usan los Props
const auxIfaces = [...dts.matchAll(/^export (interface|type) (\w+)[^\n]*(?:\n(?!export )[^\n]*)*/gm)].map((m) => ({ name: m[2], text: m[0] })).filter((x) => !/Props$/.test(x.name));

// ---- 5. Emitir ----
const kebab = (s) => s.replace(/([a-z])([A-Z0-9])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();
fs.mkdirSync(OUT, { recursive: true });
const libDecls = helpers.filter((d) => !home.has(d.names[0]));
const libNames = new Set(libDecls.flatMap((d) => d.names));
const fileOf = (n) => (comps.has(n) ? n : home.has(n) ? home.get(n) : libNames.has(n) ? '__lib' : null);

async function emit(fname, nodes, opts) {
  const body = [];
  for (const d of nodes) { body.push(t.cloneNode(d.node, true)); for (const x of d.extra || []) body.push(t.cloneNode(x, true)); }
  const file = t.file(t.program(body));
  jsxify(file);
  traverse(file, {
    Function(p) { for (const prm of p.node.params) { const id = t.isAssignmentPattern(prm) ? prm.left : prm; if (t.isIdentifier(id) && !id.typeAnnotation) { id.typeAnnotation = t.tsTypeAnnotation(t.tsAnyKeyword()); if (!t.isAssignmentPattern(prm)) id.optional = true; } else if (t.isRestElement(prm) && !prm.typeAnnotation) prm.typeAnnotation = t.tsTypeAnnotation(t.tsAnyKeyword()); } },
    VariableDeclarator(p) { const fp = p.parentPath.parentPath; if (fp && (fp.isForInStatement() || fp.isForOfStatement()) && fp.node.left === p.parent) return; if (t.isIdentifier(p.node.id) && !p.node.id.typeAnnotation) p.node.id.typeAnnotation = t.tsTypeAnnotation(t.tsAnyKeyword()); },
    CatchClause(p) { /* e es unknown: lo dejamos */ },
    'FunctionDeclaration|FunctionExpression|ArrowFunctionExpression'(p) { if (!p.node.returnType) p.node.returnType = t.tsTypeAnnotation(t.tsAnyKeyword()); },
    MemberExpression(p) { if (p.node.computed && (t.isObjectExpression(p.node.object) || t.isArrayExpression(p.node.object))) p.node.object = t.tsAsExpression(p.node.object, t.tsAnyKeyword()); else if (t.isIdentifier(p.node.object, { name: 'window' }) && !p.scope.hasBinding('window') && t.isIdentifier(p.node.property) && /^webkit|^moz|^ms/.test(p.node.property.name)) p.node.object = t.tsAsExpression(t.identifier('window'), t.tsAnyKeyword()); },
    Identifier(p) { if (p.node.name !== 'arguments' || !p.isReferencedIdentifier()) return; const fn = p.getFunctionParent(); if (fn && !fn.node.params.some((x) => t.isRestElement(x))) { const r = t.restElement(t.identifier('_args')); r.typeAnnotation = t.tsTypeAnnotation(t.tsArrayType(t.tsAnyKeyword())); fn.node.params.push(r); } },
  });
  // referencias externas
  const need = new Map(); const react = new Set();
  const own = new Set(nodes.flatMap((d) => d.names));
  const mark = (n, p) => { if (p.scope.hasBinding(n, true)) return; if (REACTVARS.has(n)) react.add(n); else if (top.has(n) && !own.has(n)) { const f = fileOf(n); if (f && f !== opts.self) { if (!need.has(f)) need.set(f, new Set()); need.get(f).add(n); } } };
  traverse(file, { Identifier(p) { if (p.isReferencedIdentifier()) mark(p.node.name, p); }, JSXIdentifier(p) { if (p.parentPath.isJSXOpeningElement() || p.parentPath.isJSXClosingElement() || p.parentPath.isJSXMemberExpression()) { if (/^[A-Z]/.test(p.node.name)) mark(p.node.name, p); } } });
  let code = generate(file, { retainLines: false, jsescOption: { minimal: true } }).code;
  // export + tipos
  for (const n of opts.exports) {
    code = code.replace(new RegExp(`^function ${n}\\(`, 'm'), `export function ${n}(`).replace(new RegExp(`^var ${n}(: any)? = `, 'm'), `export var ${n}: any = `);
  }
  if (opts.typed) for (const n of opts.typed) code = code.replace(new RegExp(`^export function ${n}\\(p\\?: any\\)`, 'm'), `export function ${n}(props: ${n}Props): React.ReactElement\nexport function ${n}(p?: any)`);
  const imports = [];
  imports.push(`import * as React from "react"`);
  const hooks = [...react].filter((x) => ['useState', 'useRef', 'useEffect', 'useId'].includes(x));
  let pre = '';
  if (react.has('R')) pre += 'const R: any = React\n';
  if (react.has('h')) pre += 'const h: any = React.createElement\n';
  if (hooks.length) pre += `const { ${hooks.join(', ')} }: any = React\n`;
  for (const [f, ns] of [...need].sort()) imports.push(`import { ${[...ns].sort().join(', ')} } from "./${f === '__lib' ? 'lib' : kebab(f)}"`);
  let header = opts.header || '';
  let typeBlock = '';
  if (opts.types) typeBlock = opts.types.join('\n\n') + '\n\n';
  const out = `"use client"\n${header}\n${imports.join('\n')}\n\n${typeBlock}${pre}\n${code}\n`;
  let pretty;
  try { pretty = await prettier.format(out, { parser: 'typescript', semi: false, singleQuote: false, printWidth: 110 }); }
  catch (e) { console.error('prettier', fname, e.message.split('\n')[0]); pretty = out; }
  fs.writeFileSync(path.join(OUT, fname), pretty);
  return { imports: [...need.keys()] };
}

const manifest = {};
{ let tt = dts.replace(/\ndeclare global \{[\s\S]*$/, '\n').replace(/^export declare function[^\n]*\n?/gm, '').replace(/^declare const[^\n]*\n?/gm, '').replace(/^export default[^\n]*\n?/gm, '');
  fs.writeFileSync(path.join(OUT, 'types.ts'), '/* Frekvens — tipos de todas las props. MIT © Cris Olmedo */\n' + tt.replace(/\n{3,}/g, '\n\n')); }
// lib
{
  const exportsLib = libDecls.flatMap((d) => d.names);
  const r = await emit('lib.tsx', libDecls, { self: '__lib', exports: exportsLib, header: '/* Frekvens — utilidades compartidas. MIT © Cris Olmedo */\n' });
  manifest.__lib = { deps: r.imports };
}
for (const n of apiNames) {
  if (!comps.has(n)) continue;
  const d = top.get(n);
  const extras = helpers.filter((hd) => home.get(hd.names[0]) === n);
  const pd = propsDecl(n);
  const r = await emit(kebab(n) + '.tsx', [...extras, d], { self: n, exports: [n, ...extras.flatMap((x) => x.names)], typed: pd ? [n] : [], types: pd ? [`import type { ${n}Props } from "./types"\nexport type { ${n}Props }`] : [], header: `/* Frekvens · ${n} — MIT © Cris Olmedo */\n` });
  manifest[n] = { file: kebab(n) + '.tsx', deps: r.imports.filter((x) => x !== '__lib'), lib: r.imports.includes('__lib') };
}
fs.writeFileSync(path.join(OUT, '_manifest.json'), JSON.stringify(manifest, null, 1));
console.log('componentes', Object.keys(manifest).length - 1, '· lib', libDecls.length, 'declaraciones · ayudantes en archivos de componente', home.size);
