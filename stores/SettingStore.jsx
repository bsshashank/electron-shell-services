// @flow

import Reflux from 'reflux'
import SettingManager from '../actions/SettingManager'

/**
 * [config description]
 * @type {[type]}
 */
class SettingStore extends Reflux.Store {

  /**
   * [constructor description]
   * @return {[type]} [description]
   */
  constructor() {
    super()
    this.listenables = SettingManager
    this.state = {
      lastError: null,
      settings: {}
    }
  }

  onInitializeCompleted(settings:Object) {
    this.setState({ lastError: null, settings: settings })
  }

  onInitializeFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onImportCompleted(settings:Object) {
    this.setState({ lastError: null, settings: settings })
  }

  onImportFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onUpdateCompleted(namespace:string, name:string, value:Object) {
    let settings = this.state.settings
    settings[namespace][name] = value
    this.setState({ lastError: null, settings: settings })
  }

  onUpdateFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }
}

export default SettingStore
