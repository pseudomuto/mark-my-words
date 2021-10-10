import { BrowserWindow } from 'electron'
import path from 'path'
import { startWatching, stopWatching } from './watch-list'

const webPreferences = {
  preload: path.join(__dirname, 'preload.js'),
  allowRunningInsecureContent: false,
  contextIsolation: true,
  enableRemoteModule: false,
  nodeIntegration: false,
  sandbox: true
}

export default (url, filePath) => {
  const win = new BrowserWindow({
    show: false,
    webPreferences
  })

  win.setTitle(path.basename(filePath))
  win.loadURL(`${url}#${filePath}`)

  win.once('ready-to-show', () => {
    startWatching(win, filePath)
    win.show()
  })

  win.on('close', () => { stopWatching(win) })
  return win
}
