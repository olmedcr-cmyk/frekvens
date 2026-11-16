// El widget que ChatGPT (o cualquier cliente de MCP Apps) pinta en la conversación.
// Es una página suelta: carga el bundle clásico de Frekvens desde la web y pinta con Render el spec que devuelve `render_ui`.
// Habla el puente estándar de MCP Apps (postMessage JSON-RPC) y, donde exista, usa window.openai como respaldo.
export const WIDGET_VERSION = "1"
export const WIDGET_URI = `ui://frekvens/render.html?v=${WIDGET_VERSION}`
export const WIDGET_MIME = "text/html;profile=mcp-app"

const client = String.raw`
(function () {
  var F = window.Frekvens, root = ReactDOM.createRoot(document.getElementById('root'));
  var data = null, hostTheme = null, nextId = 1, waiting = {};
  function post(m) { try { parent.postMessage(Object.assign({ jsonrpc: '2.0' }, m), '*'); } catch (e) {} }
  function request(method, params) { var id = nextId++; return new Promise(function (ok) { waiting[id] = ok; post({ id: id, method: method, params: params }); }); }
  function theme() {
    var want = data && data.theme, dark = hostTheme ? hostTheme === 'dark' : want === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : want === 'light' ? 'light' : 'blanco');
  }
  function say(text) {
    if (window.openai && window.openai.sendFollowUpMessage) window.openai.sendFollowUpMessage({ prompt: text });
    else post({ id: nextId++, method: 'ui/message', params: { role: 'user', content: [{ type: 'text', text: text }] } });
  }
  // Las props "action:nombre" del spec avisan a la conversación; el modelo decide qué hacer.
  var actions = new Proxy({}, { get: function (_, name) { return function (value) { say('Acción «' + String(name) + '»' + (value != null && typeof value !== 'object' ? ': ' + value : '')); }; } });
  function paint(d) {
    if (!d || !d.spec) return; data = d; theme();
    root.render(React.createElement(F.Render, { spec: d.spec, actions: actions }));
  }
  function context(c) { if (c && c.theme) { hostTheme = c.theme; theme(); } }
  window.addEventListener('message', function (e) {
    var m = e.data; if (e.source !== window.parent || !m || m.jsonrpc !== '2.0') return;
    if (m.id != null && waiting[m.id]) { var ok = waiting[m.id]; delete waiting[m.id]; ok(m.result || {}); return; }
    if (m.method === 'ui/notifications/tool-result') paint(m.params && m.params.structuredContent);
    else if (m.method === 'ui/notifications/tool-input') { var a = m.params && m.params.arguments; if (a && a.spec && !data) paint(a); }
    else if (m.method === 'ui/notifications/host-context-changed') context(m.params);
    else if (m.method === 'ping' && m.id != null) post({ id: m.id, result: {} });
  });
  request('ui/initialize', { protocolVersion: '2026-01-26', appInfo: { name: 'frekvens', version: '${WIDGET_VERSION}' }, appCapabilities: {} })
    .then(function (r) { context(r.hostContext); post({ method: 'ui/notifications/initialized' }); });
  // Respaldo: el objeto propio de ChatGPT.
  function fromOpenAI() { var o = window.openai; if (!o) return; if (o.theme) { hostTheme = o.theme; } if (o.toolOutput && o.toolOutput.spec) paint(o.toolOutput); else theme(); }
  window.addEventListener('openai:set_globals', fromOpenAI); fromOpenAI();
  if (window.ResizeObserver) new ResizeObserver(function () {
    var h = Math.ceil(document.documentElement.getBoundingClientRect().height), w = Math.ceil(document.documentElement.getBoundingClientRect().width);
    post({ method: 'ui/notifications/size-changed', params: { width: w, height: h } });
    if (window.openai && window.openai.notifyIntrinsicHeight) window.openai.notifyIntrinsicHeight(h);
  }).observe(document.documentElement);
  // Fuera de un cliente (abierta a mano con ?demo) enseña un ejemplo, para poder probarla.
  if (parent === window && /[?&]demo/.test(location.search)) paint({ spec: { type: 'Stack', props: { gap: 3 }, children: [
    { type: 'Text', props: { variant: 'title', sub: 'Vista de prueba' }, children: 'Frekvens' },
    { type: 'FillCard', props: { title: 'Depósito', value: 72, tone: 'klein' } },
    { type: 'KeyButton', props: { tone: 'klein', shape: 'pill', block: true, onClick: 'action:probar' }, children: 'Probar' } ] } });
})();
`.replace("${WIDGET_VERSION}", WIDGET_VERSION)

export function widgetHtml(base: string) {
  return `<!doctype html>
<html lang="es" data-theme="blanco">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Frekvens</title>
<link rel="stylesheet" href="${base}/preview/frekvens.css">
<style>html, body { margin: 0; background: transparent; } body { padding: 16px; } #root:empty { min-height: 96px; }</style>
<script src="${base}/preview/react.js"></script>
<script src="${base}/preview/react-dom.js"></script>
<script src="${base}/preview/frekvens.js"></script>
</head>
<body>
<div id="root"></div>
<script>${client}</script>
</body>
</html>`
}
