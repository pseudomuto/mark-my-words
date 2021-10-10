import { Menu, shell } from 'electron'
import { onOpenFile } from './app'
import packageJson from '../package.json'

const isMac = process.platform === 'darwin'

const template = [
  { role: 'appMenu' },
  {
    label: 'File',
    submenu: [
      { label: 'Open', accelerator: 'CommandOrControl+O', click: (_, __) => onOpenFile() },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          await shell.openExternal(packageJson.repository)
        }
      }
    ]
  }
]

export default Menu.buildFromTemplate(template)
