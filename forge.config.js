module.exports = {
  packagerConfig: {
    appBundleId: 'com.pseudomuto.mark-my-words',
    appCopyright: '2021 David Muto (pseudomuto)',
    icon: './public/icon'
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './public/icon.icns',
        format: 'ULFO'
      }
    }
  ]
}
