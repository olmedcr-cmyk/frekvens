# Ruler

Regla de sintonía: la escala se desliza bajo una aguja fija, como el dial de una radio. Para elegir un valor dentro de un rango largo sin perder de vista los vecinos (frecuencia, día, peso, minuto de una pista).

- **Props**: `value` / `defaultValue` / `onChange`, `min`, `max`, `step` (1), `major` (cada cuántos pasos va una marca alta con número; 10), `pitch` (px entre marcas; 10), `format` (cómo se escribe el valor), `unit`, `tone` de la aguja (`rams` · `klein` · `ink`), `label`.
- Se arrastra con el dedo o el ratón. Con teclado: flechas (un paso), Re Pág / Av Pág (una marca alta), Inicio / Fin.
- Es un `slider` para los lectores de pantalla: dale siempre `label` y, si el número solo no se entiende, `format` y `unit`.
- Ocupa el ancho que le des y mide 56 px de alto. Para rangos cortos (0–10) usa `Slider`; para valores con vuelta, `Dial`.
