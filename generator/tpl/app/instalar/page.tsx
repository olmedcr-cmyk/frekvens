import fs from "node:fs"
import path from "node:path"
import { Markdown, siteLinks } from "../markdown"
export const metadata = { title: "Instalar — Frekvens" }
export default function Page() { const md = fs.readFileSync(path.join(process.cwd(), "README.md"), "utf8"); return <Markdown src={siteLinks(md)} /> }
