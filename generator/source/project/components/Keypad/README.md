# Keypad

Fila de teclas pegadas con junta de 1 px, a lo Teenage Engineering: la barra de modos o de transporte al pie de la pantalla.

- **Props**: `keys` (array de `{label, icon, tone, active, onClick, ariaLabel}`), `columns` (por defecto, una por tecla), `height`, `label` (nombre accesible del grupo).
- 3 o 4 teclas. Etiquetas de 3 letras en mono (`LOG` `SET` `PRO`) o un icono de transporte (rec · play · stop). La tecla activa se invierte a `ink`.
- Siempre a sangre del ancho útil, pegado al borde inferior seguro. No mezclar texto e icono en la misma fila salvo que todas las teclas lleven ambos.
