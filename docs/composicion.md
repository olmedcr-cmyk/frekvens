# Composición — menos es más, y todo medido

Frekvens es funcional como un mueble de IKEA: piezas grandes que encajan, que se entienden sin instrucciones y que se usan con la mano entera, no con la punta del dedo. Esta página son las reglas de montaje. Si una pieza no cumple, se corrige la pieza; no se añade decoración para disimular.

## 1. Menos es más

- **Una idea por pantalla.** Un héroe (un número, un dial, una rejilla), una acción `klein`, como mucho dos tonos de bloque.
- **Quita antes de añadir.** Si un elemento repite lo que otro ya dice (una escala bajo un anillo que ya se mueve, un texto que repite la etiqueta, un icono junto a la palabra que ya lo dice), sobra.
- **Nada decora.** Sombras, degradados y líneas solo si informan: la sombra de una tecla dice "se hunde", el aura dice "disponible".
- **Texto mínimo.** La etiqueta mono dice qué es; el número dice cuánto. Sin frases de relleno.

## 2. Para manos con poca precisión

- Objetivo mínimo **56 px** para la acción principal y **44 px** para todo lo demás. En `DotGrid` para elegir, 56 px por defecto.
- **Espacio entre objetivos ≥ 8 px**, para no pulsar el vecino.
- Arrastrar nunca es la única forma: `Board`, `Sortable`, `Blueprint`, `Dial`, `Fader` y `Deck` se manejan también con teclado o botones.
- Lo irreversible pide **mantener** (`HoldButton`) o **deslizar** (`SlideToStart`), nunca un toque.
- Responde al **bajar el dedo** cuando es un instrumento (`PadGrid`) y al **soltar** cuando es una decisión (botones).

## 3. Auto layout: pilas, no posiciones

Cada bloque es una pila (`Stack`) o una rejilla (`Grid`) con tres números: **dirección, gap y padding**. Nada se coloca a mano con márgenes sueltos.

| Relación | Gap |
| --- | --- |
| Juntas de una botonera, tiles de una rejilla, celdas | `space-2` (8) |
| Elementos de una tarjeta (etiqueta, valor, mando) | `space-3`–`space-4` (12–16) |
| Bloques de una pantalla | `space-5`–`space-6` (24–32) |
| Bajo el título | `space-7` (48) |

- Todo en la rejilla de 4: nunca 10, 14 o 18 px.
- El padding de una caja es igual o mayor que el gap de sus hijos: si dentro hay 16 entre piezas, el borde lleva al menos 16.
- Alineación: a la izquierda y arriba. Se centra solo el héroe y los objetos redondos.

## 4. Radios concéntricos

**Radio de fuera = radio de dentro + padding.** Si no, la esquina de dentro "flota" y se nota.

| Caja (radio) | Padding | Hijo (radio) |
| --- | --- | --- |
| `xl` 40 | 24 | `md` 16 |
| `lg` 24 | 8 | `md` 16 |
| `lg` 24 | 16 | `sm` 8 |
| `md` 16 | 8 | `sm` 8 |

- Elige el padding para que el hijo caiga en un radio de la escala.
- **Excepción**: un disco o una píldora dentro de una caja (la tecla redonda del `AudioTrack`, los carretes de `TapeDeck`). La caja manda.
- Probado en todas las vistas con una sonda que mide cada hijo pegado a la esquina de su caja (ver *Calidad*).

## 5. Proporción

- Escala de tamaños de pieza: 56 · 88 · 120 · 168 (`hit-min`, `key-m`, `key-l`, `key-xl`). No hay teclas de 70 o 100.
- Teclas de doble ancho o alto ocupan **dos celdas más su junta**, nunca "un poco más".
- Tipografía: un salto grande entre el número héroe y todo lo demás. Si dos textos se parecen en tamaño, sobra uno.
- Círculos: los instrumentos (relojes, diales, vúmetros) se dibujan en un cuadrado y su texto va dentro del círculo o debajo, nunca a los lados.

## 6. Estados que se ven de lejos

- **Disponible = aura.** Un halo que respira alrededor de quien está (`Aura`, `Avatar status`), no un punto de 8 px en la esquina. En directo respira más rápido; ausente, en `sol`; desconectado, sin halo y atenuado.
- **Trabajando = haz.** `Beam` recorre el borde de la caja que está generando.
- **Pendiente · en curso · hecho = aro · puntos · disco** (`StateMark`).
- **Ocupado = tachado y hundido** (`DotGrid`), no solo gris.

## Antes de dar una pantalla por buena

1. ¿Puedo quitar algo sin perder información? Quítalo.
2. ¿Todo está en una pila con gap de la escala?
3. ¿Los radios son concéntricos?
4. ¿La acción principal mide ≥ 56 px y está en el tercio inferior?
5. ¿Cada estado se entiende sin color y sin animación?
