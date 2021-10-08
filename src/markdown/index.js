import marked from 'marked'

marked.use({
  breaks: true,
  gfm: true
})

export default (md) => marked(md)
