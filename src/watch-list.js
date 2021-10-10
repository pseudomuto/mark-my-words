import { ipcMain } from 'electron'
import chokidar from 'chokidar'
import path from 'path'

import constants from './constants'
import markdown from './markdown'

const watchers = new Map()

ipcMain.on(constants.RELOAD_EVENT, (_, file) => {
  console.log('Reloading file', file)
  // TODO: filter this to only reload what's needed
  watchers.forEach((_, k) => reloadAndNotify(k, file))
})

const reloadAndNotify = async (win, file) => {
  win.webContents.send(constants.RELOADED_EVENT, {
    name: path.basename(file),
    dir: path.dirname(file),
    html: await markdown.mdFile(file)
  })
}

const startWatching = (targetWindow, file, watchFn = chokidar.watch) => {
  // setup a watcher
  const watcher = watchFn(file, { persistent: true })
  watchers.set(targetWindow, watcher)
  watcher.on('change', async (path) => await reloadAndNotify(targetWindow, path))
  // TODO: handle deletes/renames
}

const stopWatching = async (targetWindow) => {
  if (watchers.has(targetWindow)) {
    await watchers.get(targetWindow).close()
    watchers.delete(targetWindow)
  }
}

export default { startWatching, stopWatching }
