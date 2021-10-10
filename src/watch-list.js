import { ipcMain } from 'electron'
import chokidar from 'chokidar'
import path from 'path'

import markdown from './markdown'

const watchers = new Map()

ipcMain.on('RELOAD', (_, file) => {
  console.log('Reloading file', file)
  // TODO: filter this to only reload what's needed
  watchers.forEach((_, k) => reloadAndNotify(k, file))
})

const reloadAndNotify = async (win, file) => {
  const html = await markdown.mdFile(file)
  win.webContents.send('RELOADED', {
    name: path.basename(file),
    dir: path.dirname(file),
    html
  })
}

export const startWatching = (targetWindow, file) => {
  // setup a watcher
  const watcher = chokidar.watch(file, { persistent: true })
  watchers.set(targetWindow, watcher)
  watcher.on('change', (path) => reloadAndNotify(targetWindow, path))
  // TODO: handle deletes/renames
}

export const stopWatching = async (targetWindow) => {
  if (watchers.has(targetWindow)) {
    await watchers.get(targetWindow).close()
    watchers.delete(targetWindow)
  }
}
