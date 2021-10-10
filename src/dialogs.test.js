import dialogs from './dialogs'

describe('openFile', () => {
  const mockDialog = (ret) => {
    return { showOpenDialog: jest.fn(_ => ret) }
  }

  test('calls showOpenDialog with correct parameters', async () => {
    const dlg = mockDialog({ filePaths: ['/some/path/file.md'] })
    await dialogs.openFile(dlg)

    expect(dlg.showOpenDialog.mock.calls[0][0]).toStrictEqual({
      title: 'Open markdown file',
      filters: [{ name: 'Markdown files', extensions: ['md', 'markdown', 'txt'] }],
      properties: ['openFile']
    })
  })

  test('returns the selected path', async () => {
    const dlg = mockDialog({ filePaths: ['/some/path/file.md'] })
    return expect(await dialogs.openFile(dlg)).toBe('/some/path/file.md')
  })

  test('returns undefined when no file selected', async () => {
    const dlg = mockDialog()
    return expect(await dialogs.openFile(dlg)).toBeUndefined()
  })
})
