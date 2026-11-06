# UsageMeter

Cuota usada frente a un límite ("996 de 10.000"): barra `ink` que pasa a `sol` al 70 % y a `rams` al 90 %, con acción (ampliar) cuando está cerca del tope. Con `segments`, se convierte en un reparto por categorías.

- **Props**: `label`, `used`, `limit`, `unit`, `format(n)`, `segments` (`SplitBar`), `action` (`{label, onClick}`, se muestra al 90 %).
