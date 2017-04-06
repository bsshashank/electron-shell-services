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

  onInstallCompleted (extension) {
    this.setState({ lastError: null, extensions: [ extension, ...this.extensions ] })
  }

  onInstallFailed (err) {
    this.setState({ lastError: err })
  }
}

export default ExtensionStore
