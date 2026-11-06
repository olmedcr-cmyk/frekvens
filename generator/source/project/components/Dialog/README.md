# Dialog

Ventana modal centrada para decidir algo ahora: confirmar, avisar de algo destructivo, pedir un dato, compartir, un asistente por pasos. Escala desde .96 al entrar; atrapa el foco (en `danger` empieza en Cancelar, la opción segura); Esc o el fondo la cierran.

- **Props**: `open`, `onClose()`, `title`, `text`, `children` (campos), `tone` (`default` · `danger`: icono y acción en `rec`, `role="alertdialog"`), `icon`, `primary` / `onPrimary` / `primaryDisabled`, `secondary` (texto o `false`) / `onSecondary`, `steps` + `step` (asistente), `size` (`l`), `dismissible` (false = solo con botones), `inline`.
- En móvil, para formularios largos, `Sheet`. El título dice la acción ("¿Borrar la sesión?"), y el botón repite el verbo ("Borrar"), nunca "Aceptar".
