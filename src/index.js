const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const menu = require('./menu')

app.on('ready', () => {
  Menu.setApplicationMenu(menu)

  const mainWindow = new BrowserWindow()
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'))
})
