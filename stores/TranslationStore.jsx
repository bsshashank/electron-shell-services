// @flow

import Reflux from 'reflux'
import TranslationManager from '../actions/TranslationManager'

import type { TranslationType } from 'electron-shell-lib'

/**
 * [config description]
 * @type {[type]}
 */
class TranslationsStore extends Reflux.Store {

  /**
   * [constructor description]
   * @return {[type]} [description]
   */
  constructor() {
    super()
    this.state = {
      lastError: null,
      locale: 'en',
      data: [],
      translations: {}
    }
    this.listenables = TranslationManager
  }

  onInitializedCompleted() {

  }

  onInitializedFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onSwitchLocaleCompleted(locale:string, rows: Array<TranslationType>, messages:Object) {
    this.setState({ locale: locale, data:rows, translations: messages })
  }

  onSwitchLocaleFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onUpdateCompleted(data:Object) {

  }

  onUpdateFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onImportCompleted(locale:string, messages:Array<Object>) {

  }

  onImportFailed(err:Object) {
    this.setState({ lastError: err })
  }

  onExportCompleted(locale:string) {

  }

  onExportFailed(err:Object) {
    this.setState({ lastError: err })
  }
}

export default TranslationsStore
