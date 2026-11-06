# Bloques y patrones

Los patrones de interfaz más habituales en SaaS e IA, resueltos con piezas de Frekvens. Cada fila dice con qué se monta y dónde verlo.

| Bloque | Variantes | Con qué | Dónde |
| --- | --- | --- | --- |
| Chat de IA | básico, con selector de modelo y esfuerzo, app completa con historial | `Message`, `Composer`, `PromptBox`, `Sidebar`, `Menu` | `PantallaIA`, `PantallaConversacion` |
| Caja de prompt | con voz, con modelo, compacta, con adjuntos, con sugerencias | `PromptBox`, `Suggestions` | `PromptBox`, `PantallaIA` |
| Paleta de comandos | con grupos, con atajos, búsqueda global | `CommandBar` | `CommandBar` |
| Diálogos | confirmar, destructivo, con campo, contraseña, compartir con permisos, asistente por pasos, fecha y hora, miembros | `Dialog` + `TextField`, `Switch`, `Steps`, `Calendar`, `Wheel`, `ListRow` | `PantallaDialogos` |
| Subida de archivos | simple, zona múltiple, con progreso, con secciones Subiendo/Listos, con error | `FileDrop` | `FileDrop`, `PantallaOnboarding` |
| Formularios | con etiquetas, ajustes con casillas, elección de plan o paquete | `TextField`, `Select`, `Checkbox`, `RadioGroup`, `ChoiceCards` | `PantallaLogin`, `PantallaOnboarding` |
| Listas en rejilla | con menú, con enlaces, con iconos | `ListRow`, `Avatar`, `Menu`, `Tile` | `PantallaControl` |
| Acceso | email + social, email + contraseña, enlace mágico, SSO, alta con rol | `TextField`, `KeyButton`, `Checkbox`, `Select`, `Banner`, `Steps` | `PantallaLogin` |
| Onboarding | checklist, pasos con progreso, acordeón, actividad, línea de tiempo, despliegue | `Checklist`, `Steps`, `Cabinet`, `Timeline` | `PantallaOnboarding`, `PantallaEstados` |
| Barra lateral | con secciones, contraída, flotante, inset, doble (lista + detalle) | `Sidebar` | `PantallaControl`, `PantallaIA`, `Pantalla3D` |
| Estadísticas | con tendencia, con bordes, con estado, con progreso circular, cuotas, reparto, proyección | `Stat`, `UsageMeter`, `ProgressRing`, `SplitBar`, `ListRow` | `PantallaStats` |
| Tablas | ordenar, seleccionar, filas agrupadas, paginación, celdas de estado, tendencia y barra | `DataTable` | `DataTable`, `PantallaControl` |
| Dashboards | KPIs, gráficos, reparto, tabla, filtros; generados por un agente | `Stat`, `LineChart`, `BarMeter`, `Heatmap`, `SplitBar`, `DataTable`, `Render` | `PantallaAnalitica`, `PantallaDashboardIA` |

Cuando un bloque no está aquí, compónlo con `Stack`, `Grid` y `Text` y las reglas de *UI generativa y conversación*; si se repite en tres pantallas, merece su propio componente.
