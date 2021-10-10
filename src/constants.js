import packageJSON from '../package.json'

const values = {
  APP_DESCRIPTION: packageJSON.description,
  APP_NAME: packageJSON.productName,
  APP_VERSION: packageJSON.version,
  RELOAD_EVENT: 'RELOAD',
  RELOADED_EVENT: 'RELOADED'
}

export default values
