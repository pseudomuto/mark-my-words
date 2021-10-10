import { contextBridge, ipcRenderer } from 'electron'

// linting disabled since we're only loading it for the side effects
import preload from './preload' // eslint-disable-line

jest.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn()
  },
  ipcRenderer: {
    on: jest.fn(),
    send: jest.fn()
  }
}))

describe('preload', () => {
  const args = contextBridge.exposeInMainWorld.mock.calls[0]

  test('registers ipc module', () => {
    expect(contextBridge.exposeInMainWorld).toHaveBeenCalled()
    expect(args[0]).toBe('ipc')
  })

  test('ipc.reload sends the RELOAD event', () => {
    args[1].reload('bogus.md')
    expect(ipcRenderer.send.mock.calls[0]).toEqual(['RELOAD', 'bogus.md'])
  })

  test('ipc.onReloaded sets up a handler for the RELOADED event', () => {
    const fn = () => {}
    args[1].onReloaded(fn)
    expect(ipcRenderer.on.mock.calls[0]).toEqual(['RELOADED', fn])
  })
})
