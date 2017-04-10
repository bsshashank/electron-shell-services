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

  onActivateCompleted(extension: ExtensionInfoType) {
    const idx = this.state.extensions.findIndex((e) => e._id === extension._id)
    let extensions = this.state.extensions
    if (idx !== -1) {
      extensions.splice(idx, 1, extension)
    }
    this.setState({ lastError: null, extensions: extensions })
  }

  onActivateFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onDeactivateCompleted(extension: ExtensionInfoType) {
    const idx = this.state.extensions.findIndex((e) => e._id === extension._id)
    let extensions = this.state.extensions
    if (idx !== -1) {
      extensions.splice(idx, 1, extension)
    }
    this.setState({ lastError: null, extensions: extensions })
  }

  onDeactivateFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }
}

export default ExtensionStore
