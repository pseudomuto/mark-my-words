import { readFile } from 'fs/promises'
import marked from 'marked'

marked.use({
  breaks: true,
  gfm: true
})

const md = (md) => marked(md)

const mdFile = async (path) => {
  return md(await readFile(path, 'utf8'))
}

export default { md, mdFile }
