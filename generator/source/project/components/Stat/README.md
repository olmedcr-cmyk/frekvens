# Stat

KPI de panel: etiqueta mono, valor grande fino, tendencia (`Sparkline`), variación con ▲▼ y, si hace falta, estado (`En objetivo` · `Atención` · `En riesgo`), valor anterior y enlace.

- **Props**: `label`, `value`, `unit`, `delta` (`'+12 %'`, `'-3 %'`), `inverse` (bajar es bueno: cancelaciones, gasto), `trend` (array), `previous`, `status` (`ok` · `warn` · `risk`) + `statusLabel`, `link` (`{label, onClick}`), `tone` (`surface`).
- El sentido malo se marca con subrayado `rams`, además de la flecha: nunca solo con color.
