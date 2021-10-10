/*
 * This file is a bit special. It must be a commonjs module unlike all the others. It's just the way that electron loads
 * the preload script. While I'm sure with enough time and effort this could be resolved, it didn't seem worth the
 * effort IMO.
*/
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
  // can't use constants.js here since rollup removes the module
  reload: (file) => { ipcRenderer.send('RELOAD', file) },
  onReloaded: (fn) => { ipcRenderer.on('RELOADED', fn) }
})
