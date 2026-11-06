# TextField

Campo de texto en píldora de 56 px sobre `well`; al enfocarse sube a `surface` con borde `focus`. Opcionalmente lleva al lado una tecla redonda `klein` con flecha para enviar (el campo de correo de una sola acción).

- **Props**: `label`, `hint`, `error` (texto; marca `aria-invalid` y borde `rec`), `onSubmit(value)` (añade la tecla de envío y envuelve en `<form>`), `submitLabel`, `mono` (para códigos, correos), y cualquier atributo de `<input>`.
- El error dice qué hacer, no qué falló: "Escribe un correo con @". La etiqueta siempre visible: el placeholder es un ejemplo, no la etiqueta.
