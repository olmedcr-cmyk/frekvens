# Pictogram

Una cantidad contada en fichas: tantas encendidas como llevas, el resto apagadas. Se entiende sin leer un eje.

- **Props**: `value`, `total` (10), `columns`, `shape` (`dot` | `square` | `drop` | `bar`), `from` (`start` | `end`: por dónde empieza a llenarse), `size`, `tone`, `unit`, `label`.
- `drop` para agua, `bar` para días o cuotas en una sola fila, `dot` para todo lo demás.
- Hasta unas 50 fichas. Acompáñalo de la cifra en texto (`Text` o `Stat`): el pictograma da la proporción, no el número exacto.
