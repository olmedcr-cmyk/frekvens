# Banner

Aviso dentro de la página, a todo el ancho: un bloque de color con icono, título opcional, una frase y, si hace falta, una acción. Para lo que el usuario debe saber mientras sigue en la pantalla.

- **Props**: `tone` (`info` klein-soft · `ok` verde · `warn` sol · `error` rec), `title`, `children`, `icon`, `action` (`{label, onClick}`), `dismissible`, `onDismiss()`.
- `error` se anuncia como alerta. Lo pasajero va en `Toast`; lo que bloquea, en `Sheet`.
