// make electron-reloader a thing
require('electron-reloader')(module)
// ensure ESM is used to load modules
module.exports = require('esm')(module)('./src/app')
