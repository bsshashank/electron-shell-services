// @flow

import Reflux from 'reflux'
import TranslationManager from '../actions/TranslationManager'

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
      translations: {}
    }
    this.listenables = TranslationManager
  }

  onSwitchLocaleCompleted(locale:string, messages:Array<Object>) {
    this.setState({ locale: locale, translations: messages })
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
