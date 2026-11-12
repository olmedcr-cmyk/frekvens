# Onboarding

Bienvenida por pasos: un bloque de arte, una tarjeta de color con el mensaje y un pie con guiones de progreso y una tecla redonda para avanzar.

- **Props**: `slides` (`{ title, text?, eyebrow?, tone?, artTone?, art? }`), `value` / `defaultValue` / `onChange` (índice), `onDone` (al pulsar la tecla en el último paso), `onSkip` (muestra «Saltar» en el primero), `nextLabel`, `backLabel`, `skipLabel`, `doneLabel`, `label`.
- Tres o cuatro pasos como mucho, una idea por paso. El `art` es libre: una `Shape`, un `DotMatrix`, una imagen.
- La tecla es `ink` mientras quedan pasos y `klein` con una marca en el último: es la única acción principal de la pantalla.
- Con teclado, flecha derecha e izquierda cambian de paso; el paso nuevo se anuncia y los guiones dicen «Paso 2 de 3».
