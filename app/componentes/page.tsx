import catalog from "../catalog.json"
import { CatalogBoard } from "../catalog-board"
export const metadata = { title: "Componentes — Frekvens" }
export default function Page() {
  return <CatalogBoard heading={`${catalog.length} componentes`} level={1} />
}
