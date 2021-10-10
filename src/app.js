import { app, Menu } from 'electron'
import path from 'path'
import dialogs from './dialogs'
import menu from './menu'
import newWindow from './window'

let mainWindow = null

const URL = `file://${path.join(__dirname, '../public/index.html')}`

export const onOpenFile = async () => {
  const mdFile = await dialogs.openFile()
  if (!mdFile) {
    console.log('no file selected')
    return
  }

  newWindow(URL, mdFile)
}

app.on('ready', () => {
  Menu.setApplicationMenu(menu)

  mainWindow = newWindow(URL, path.join(__dirname, '../README.md'))
  mainWindow.on('closed', () => { mainWindow = null })
})

app.on('activate', () => {
  // build recent menu, etc.
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
