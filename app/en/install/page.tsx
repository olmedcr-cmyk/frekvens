import fs from "node:fs"
import path from "node:path"
import { Markdown, siteLinks } from "../../markdown"
export const metadata = { title: "Install — Frekvens" }
export default function Page() { const md = fs.readFileSync(path.join(process.cwd(), "README.en.md"), "utf8"); return <div lang="en"><Markdown src={siteLinks(md)} /></div> }
