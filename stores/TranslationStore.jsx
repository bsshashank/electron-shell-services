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
      availableLocales: [],
      localeData: { data: [], intl: {} }
    }
    this.listenables = TranslationManager
  }

  onInitializeCompleted(availableLocales:Array<string>) {
    this.setState({ availableLocales: availableLocales })
  }

  onInitializeFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onSwitchLocaleCompleted(locale:string, localeData:Object) {
    this.setState({ locale: locale, localeData: localeData })
  }

  onSwitchLocaleFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onUpdateCompleted(data:Object) {

  }

  onUpdateFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onImportCompleted(locale:string, messages:Array<Object>) {

  }

  onImportFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }

  onExportCompleted(locale:string) {

  }

  onExportFailed(err:Object) {
    console.log(err)
    this.setState({ lastError: err })
  }
}

export default TranslationsStore
