# Handoff — Frekvens

Estado al 11 de noviembre de 2026: publicado y con despliegue automático. Abajo, lo comprobado al generarlo, dónde vive y cómo se trabaja.

## Hecho y comprobado

- 119 componentes en `registry/frekvens/ui/`, un `.tsx` por componente, JSX, props tipadas. `tsc --strict`: 0 errores.
- `npm test`: los 119 compilan y renderizan en servidor; los 122 items de `public/r` resuelven sus dependencias.
- Instalación real probada: en un Next.js 15 + Tailwind v4 limpio, `npx shadcn@2.3.0 add <registro>/r/board.json switch.json render.json` instala en `components/frekvens/` y `styles/frekvens/`, y `next build` (con chequeo de tipos) pasa. La página se ve bien y `bg-paper` (utilidad Tailwind con token Frekvens) funciona.
- Web de documentación (`app/`): `next build` genera 119 páginas estáticas (inicio, catálogo, ficha de cada componente con vista previa viva, comando de instalación, docs y código), claro/oscuro sin errores en consola.
- Accesibilidad: el sistema de diseño de origen da 0 infracciones de axe en 290 páginas (claro y oscuro) y 34/34 pruebas de interacción. `npm run test:a11y` repite axe sobre `public/preview`; hay que pasarlo una vez en CI o en local tras `npx playwright install chromium` (en la sesión no llegó a terminar por tiempo).

## Publicado (11 de noviembre de 2026)

- **Repo**: https://github.com/olmedcr-cmyk/frekvens (público, rama `main`).
- **Web y registro**: https://frekvens-ui.vercel.app (`frekvens.vercel.app` era de otra web). El registro se sirve en `/r/*.json`.
- **Despliegue**: el proyecto `frekvens` de Vercel está conectado al repo; cada push a `main` despliega a producción.
- **CI**: `.github/workflows/ci.yml` corre `npm test`, axe y la build en cada push.
- **Instalación comprobada** en un Next.js 15 + Tailwind v4 limpio: `npx shadcn@latest init` y después `npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json`.

## Cómo se trabaja

1. Los componentes se editan en `generator/source/project/components/` (`bundle.js`, `bundle.css`, `index.d.ts` y el `preview.html` y `README.md` de cada uno). La web, en `generator/tpl/app/`. Lo demás se genera: no lo edites a mano.
2. `cd generator && npm install && npm run build` regenera el repo (conserva `package-lock.json` y `.vercel`).
3. Si cambia el aspecto de un componente: `npm run thumbs` (necesita `npx playwright install chromium`) y vuelve a generar. Con nombres detrás, rehace solo esas: `npm run thumbs -- gauge strip`.
4. `npm test`, `npm run test:a11y` y `npm run build` antes de subir.
5. Para cambiar de dominio: `FREKVENS_URL=https://<dominio> npm run build` en `generator/`.

## Pendiente (opcional)

- Añadirlo al directorio de registros de shadcn (`registries` en `components.json` ya documentado como `@frekvens`).
- `npm run registry:build` (`npx shadcn@latest build`; la CLI ya no es dependencia del repo) para validar `registry.json` con el esquema oficial.
- Alojar las fuentes en vez de cargarlas de Google Fonts.
- Nombre: "Frekvens" es también una colección de IKEA. Cris decidió mantenerlo; `NOTICE.md` aclara que no hay relación.

## Límites conocidos

- Estilo en una capa CSS (decisión de Cris para tener los 119 ya): los `.tsx` no llevan clases Tailwind. Si algún día se quiere "Tailwind de verdad", se reescribe componente a componente.
- `tailwind.css` redefine `rounded-sm/md/lg/xl` con los radios de Frekvens; quien ya use shadcn puede importar `tokens.css` en su lugar (está en el README).
- Las fuentes se cargan de Google Fonts (`fonts.css`); en producción conviene alojarlas.
- `Render` instala el catálogo completo (todos los componentes), porque pinta lo que el modelo pida.
