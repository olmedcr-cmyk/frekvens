// Markdown mínimo (títulos, listas, negrita, código, tablas) sin dependencias.
function inline(s: string) {
  const esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
  return esc.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/\*([^*]+)\*/g, "<i>$1</i>").replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}
export function render(md: string) {
  const lines = md.split("\n"); const out: string[] = []; let i = 0
  while (i < lines.length) {
    const l = lines[i]
    if (/^```/.test(l)) { const buf: string[] = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); i++; out.push(`<pre><code>${buf.join("\n").replace(/&/g, "&amp;").replace(/</g, "&lt;")}</code></pre>`); continue }
    if (/^#{1,3} /.test(l)) { const n = l.match(/^#+/)![0].length; out.push(`<h${n}>${inline(l.replace(/^#+ /, ""))}</h${n}>`); i++; continue }
    if (/^\|/.test(l)) { const rows: string[] = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]); const cells = rows.filter((r) => !/^\|\s*-/.test(r)).map((r) => r.replace(/^\||\|$/g, "").split("|").map((c) => c.trim())); out.push(`<table><thead><tr>${cells[0].map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${cells.slice(1).map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`); continue }
    if (/^(\d+\. |- )/.test(l)) { const ol = /^\d/.test(l); const items: string[] = []; while (i < lines.length && /^(\d+\. |- )/.test(lines[i])) items.push(lines[i++].replace(/^(\d+\. |- )/, "")); out.push(`<${ol ? "ol" : "ul"}>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</${ol ? "ol" : "ul"}>`); continue }
    if (!l.trim()) { i++; continue }
    const buf: string[] = []; while (i < lines.length && lines[i].trim() && !/^(#|\||- |\d+\. |```)/.test(lines[i])) buf.push(lines[i++]); out.push(`<p>${inline(buf.join(" "))}</p>`)
  }
  return out.join("\n")
}
export function Markdown({ src }: { src: string }) { return <div className="prose" dangerouslySetInnerHTML={{ __html: render(src) }} /> }
