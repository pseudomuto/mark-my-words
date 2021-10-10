import fs from 'fs/promises'
import watchList from './watch-list'

jest.mock('electron', () => ({
  ipcMain: { on: jest.fn() }
}))

describe('watchList', () => {
  // fake a BrowserWindow object
  const win = { webContents: { send: jest.fn() } }

  describe('startWatching', () => {
    const changeEvent = jest.fn()
    const watcher = jest.fn((name, opts) => ({ on: changeEvent }))

    beforeAll(() => watchList.startWatching(win, 'bogus.md', watcher))

    test('passes file and options to watcherFn', () => {
      expect(watcher).toHaveBeenCalledWith('bogus.md', { persistent: true })
    })

    test('registers change listener for watcher', () => {
      expect(changeEvent).toHaveBeenCalledWith('change', expect.any(Function))
    })

    test('once registered, receives reloaded events', async () => {
      // call the function that was registered for the change event
      await changeEvent.mock.calls[0][1]('testdata/heading.md')

      expect(win.webContents.send).toHaveBeenCalledWith('RELOADED', {
        name: 'heading.md',
        dir: 'testdata',
        html: await fs.readFile('testdata/heading.html', 'utf8')
      })
    })
  })

  describe('stopWatching', () => {
    test('closes the watcher', () => {
      const closeFn = jest.fn()
      const watcher = jest.fn((name, opts) => ({ on: jest.fn(), close: closeFn }))

      watchList.startWatching(win, 'bogus.md', watcher)
      watchList.stopWatching(win)

      expect(closeFn).toHaveBeenCalled()
    })

    test('works idempotently', () => {
      // no watcher registered, just making sure it doesn't go boom
      watchList.stopWatching(null)
    })
  })
})
