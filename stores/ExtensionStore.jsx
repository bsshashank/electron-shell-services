// @flow

import Reflux from 'reflux'
import ExtensionManager from '../actions/ExtensionManager'

import type { ExtensionInfoType } from 'electron-shell-lib'

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

  onInstallCompleted (extension: ExtensionInfoType) {
    this.setState({ lastError: null, extensions: [extension, ...this.state.extensions] })
  }

  onInstallFailed (err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onMountAllCompleted(extensions: Array<ExtensionInfoType>) {
    this.setState({ lastError: null, extensions: extensions })
  }

  onMountAllFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }
}

export default ExtensionStore
