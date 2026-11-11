import catalog from "./catalog.json"
import { Board, type Pin } from "./board"

// Catálogo en tablero: todos los componentes como imágenes, en columnas de alto libre.
export function CatalogBoard({ heading, level = 2 }: { heading: string; level?: 1 | 2 }) {
  const groups = [...new Set(catalog.map((c) => c.group))]
  const pins: Pin[] = groups.flatMap((g) => catalog.filter((c) => c.group === g)).map((c) => ({ slug: c.slug, name: c.name, group: c.group, thumb: c.thumb as [number, number] | null }))
  return <Board heading={heading} level={level} groups={groups} pins={pins} />
}
