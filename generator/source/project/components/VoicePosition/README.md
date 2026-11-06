# VoicePosition

De dónde viene la voz: un anillo de puntos que se inclina y viaja hacia el lado del que habla (izquierda, delante, derecha), se encoge si la voz está lejos y respira con el nivel. Debajo, las tres probabilidades con barras de puntos, la distancia y el estado (en espera · escuchando · hablando · pensando).

Inspirado en *Voice position* de libraries.dev: un modelo en el dispositivo que lee la diferencia entre los dos micrófonos del móvil. Frekvens pone la cara; el dato lo da la app.

- **Props**: `pan` (−1…1), `side` (`left` · `ahead` · `right`), `distance` (`near` · `far`), `state`, `level` (0–1), `probabilities` ([izq, delante, der]), `demo` (recorre los casos), `size`, `rings` (3), `tone`, `caption`.
- **Reglas de movimiento**: nunca salta: el cambio de lado pasa por el centro con `ease-travel` (640 ms), un sonido corto no lo mueve, y en silencio vuelve al centro. Se anuncia solo el lado ya decidido ("Voz a la izquierda, cerca").
- En el navegador el micrófono es mono: el lado debe venir de la app nativa o de un micrófono estéreo.
