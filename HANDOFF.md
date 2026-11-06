# Handoff — publicar Frekvens

Estado al 6 de noviembre de 2026. Todo lo de abajo está hecho y comprobado en la sesión de Cowork donde se generó; lo que queda es publicarlo, que no se pudo hacer desde allí (la sesión no tenía permiso para crear repositorios públicos).

## Hecho y comprobado

- 114 componentes en `registry/frekvens/ui/`, un `.tsx` por componente, JSX, props tipadas. `tsc --strict`: 0 errores.
- `npm test`: los 114 compilan y renderizan en servidor; los 117 items de `public/r` resuelven sus dependencias.
- Instalación real probada: en un Next.js 15 + Tailwind v4 limpio, `npx shadcn@2.3.0 add <registro>/r/board.json switch.json render.json` instala en `components/frekvens/` y `styles/frekvens/`, y `next build` (con chequeo de tipos) pasa. La página se ve bien y `bg-paper` (utilidad Tailwind con token Frekvens) funciona.
- Web de documentación (`app/`): `next build` genera 119 páginas estáticas (inicio, catálogo, ficha de cada componente con vista previa viva, comando de instalación, docs y código), claro/oscuro sin errores en consola.
- Accesibilidad: el sistema de diseño de origen da 0 infracciones de axe en 290 páginas (claro y oscuro) y 34/34 pruebas de interacción. `npm run test:a11y` repite axe sobre `public/preview`; hay que pasarlo una vez en CI o en local tras `npx playwright install chromium` (en la sesión no llegó a terminar por tiempo).

## Lo que queda (en orden)

1. **Crear el repo y subir**
   ```sh
   gh repo create olmedcr-cmyk/frekvens --public --source . --remote origin --push \
     --description "Componentes React para copiar y pegar, al estilo shadcn/ui. Grandes, de puntos, accesibles. MIT."
   ```
2. **Desplegar la web** (Vercel recomendado: Next 15 sin configuración). Importa el repo en Vercel o `npx vercel --prod`. La web sirve también el registro en `/r/*.json`.
3. **Apuntar el registro al dominio real.** Las URLs de dependencias van dentro de los JSON. Si el dominio no es `https://frekvens.vercel.app`:
   ```sh
   cd generator && npm install && FREKVENS_URL=https://<dominio> npm run build && cd ..
   grep -rl "frekvens.vercel.app" app generator/tpl   # la web también lo menciona: cámbialo en generator/tpl/app y regenera
   npm test && git commit -am "Registro apuntando a <dominio>" && git push
   ```
   Si el usuario de GitHub no es `olmedcr-cmyk`, cambia también el enlace de GitHub en `generator/tpl/app/layout.tsx`.
4. **Comprobar en real**: en un proyecto Next + Tailwind cualquiera, `npx shadcn@latest add https://<dominio>/r/switch.json` y `.../r/frekvens.json` (todo).
5. **CI**: `.github/workflows/ci.yml` corre `npm test`, axe y la build en cada push. Que quede en verde.
6. **Opcional**
   - Añadirlo al directorio de registros de shadcn (`registries` en `components.json` ya documentado como `@frekvens`).
   - `npm run registry:build` (`shadcn build`) para validar `registry.json` con el esquema oficial.
   - Nombre: "Frekvens" es también una colección de IKEA. Cris decidió mantenerlo; `NOTICE.md` aclara que no hay relación.

## Límites conocidos

- Estilo en una capa CSS (decisión de Cris para tener los 114 ya): los `.tsx` no llevan clases Tailwind. Si algún día se quiere "Tailwind de verdad", se reescribe componente a componente.
- `tailwind.css` redefine `rounded-sm/md/lg/xl` con los radios de Frekvens; quien ya use shadcn puede importar `tokens.css` en su lugar (está en el README).
- Las fuentes se cargan de Google Fonts (`fonts.css`); en producción conviene alojarlas.
- `Render` instala el catálogo completo (todos los componentes), porque pinta lo que el modelo pida.
