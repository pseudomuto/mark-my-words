import { dialog } from 'electron'

const openFile = async (dlg = dialog) => {
  const res = await dlg.showOpenDialog({
    title: 'Open markdown file',
    filters: [{ name: 'Markdown files', extensions: ['md', 'markdown', 'txt'] }],
    properties: ['openFile']
  })

  if (!res || res.canceled) {
    return undefined
  }

  return res.filePaths[0]
}

export default { openFile }
