import catalog from "../catalog.json"
import { CatalogIndex } from "../catalog-index"
export const metadata = { title: "Componentes — Frekvens" }
export default function Page() {
  return <CatalogIndex heading={`${catalog.length} componentes`} level={1} />
}
