const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  reload: (file) => { ipcRenderer.send('RELOAD', file) },
  onReloaded: (fn) => { ipcRenderer.on('RELOADED', fn) }
})
