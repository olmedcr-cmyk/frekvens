# ColumnChart

Columnas con su cifra encima y una destacada en `ink`: lo de cada hora, cada día o cada mes, y cuál fue el máximo.

- **Props**: `data` (`{label, value}[]`), `active` (por defecto, la más alta), `max`, `height` (200), `shape` (`bar` | `pill`), `track` (`none` | `well` | `hatch`: lo que falta hasta `max`), `tone`, `values` (`false` oculta las cifras), `unit`, `format`, `label`.
- Con `track="hatch"` el resto de cada columna va rayado: rayado significa «todavía no».
- De 4 a 8 columnas. Para una serie larga, `AreaChart` o `LineChart`; para comparar sin cifras, `BarMeter`.
