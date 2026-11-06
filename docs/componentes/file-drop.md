# FileDrop

Subida de archivos: zona de arrastre con trama de puntos que se tiñe al pasar un archivo, y la lista dividida en **Subiendo** (con barra `rams` y %) y **Listos** (icono `verde`), cada uno con su botón de quitar.

- **Props**: `files` (`[{name, size, progress, error}]`), `onFiles(FileList)`, `accept`, `multiple` (true), `title`, `hint`, `simulate` (true: anima el progreso en maquetas; `false` cuando lo controla el host).
- La zona es un `label` del input: funciona con teclado y lectores de pantalla.
