// @flow

import Reflux from 'reflux'
import ExtensionManager from '../actions/ExtensionManager'

/**
 * [config description]
 * @type {[type]}
 */
class ExtensionStore extends Reflux.Store {

  /**
   * [constructor description]
   * @return {[type]} [description]
   */
  constructor() {
    super()
    this.listenables = ExtensionManager
    this.state = {
      lastError: null,
      extensions: []
    }
  }
}

export default ExtensionStore
