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
      settings: []
    }
  }
}

export default SettingStore
