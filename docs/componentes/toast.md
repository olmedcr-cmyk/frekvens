# Toast

Aviso breve en píldora: confirma algo que ya pasó y, si acaso, ofrece deshacer. Sube 12 px y aparece; sale más rápido de lo que entra.

- **Props**: `open`, `onClose()`, `duration` (ms, auto-cierre; 4000 típico, nunca con `action` de menos de 6000), `tone` (`ink` · `verde` · `rec` · …), `icon`, `action` (`{label, onClick}`), `fixed` (centrado abajo en la ventana), `children`.
- `role="status"`; con `tone:'rec'` pasa a `alert`. Un solo toast a la vez. Una frase, sin punto final si es corta.
