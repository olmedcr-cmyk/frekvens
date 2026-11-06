# Tabs

Pestañas con dos acabados: **`pill`**, una píldora `ink` que viaja de una pestaña a otra con `ease-travel`; y **`folder`**, pestañas de carpeta de archivo que suben al seleccionarse y se funden con su panel.

- **Props**: `tabs` (`[{id, label, icon, count, tone, content}]`), `value`/`defaultValue`, `onChange(id)`, `variant` (`pill` · `folder`), `label`.
- **Teclado**: ← → recorren y activan, Inicio/Fin; Tab entra al panel. Patrón ARIA tabs.
- 2–5 pestañas. Con `folder`, cada pestaña puede llevar su `tone` y el panel lo hereda.
