// @flow

import Reflux from 'reflux'
import RefluxPromise from 'reflux-promise'
Reflux.use(RefluxPromise(Promise))

import { addLocaleData } from 'react-intl'

import viewSpecs from './TranslationManager.json'

import type { TranslationType, IDocumentDatabase } from 'electron-shell-lib'

let _docDB: IDocumentDatabase

/**
 *
 * @param {*} locale
 */
const _loadTranslations = (locale: string): Promise<*> => {
  let p = new Promise((resolve, reject) => {
    if (!_docDB) reject('ERR_NOT_INITIALISED')
    _docDB.query('translations/byLocale', { key: locale, reduce: true, group: true }).then(({ rows }) => {
      let localeData = rows[0].value
      resolve({ locale, localeData })
    }).catch(reject)
  })
  return p
}

const _loadAvailableLocales = (): Promise<*> => {
  let p = new Promise((resolve, reject) => {
    if (!_docDB) reject('ERR_NOT_INITIALISED')
    _docDB.query('translations/availableLocales', { reduce: '_count', group: true }).then(({ rows }) => {
      let availableLocales = rows.map(r => r.key)
      resolve({ availableLocales })
    }).catch(reject)
  })
  return p
}

/**
 *
 * @param {*} locale
 */
const _setNewLocale = (locale: string) => {
  const idx = locale.indexOf('-')
  if (idx !== -1) {
    locale = locale.substr(0, idx)
  }
  try {
    const locale_data = require(`react-intl/locale-data/${locale}`)
    addLocaleData([...locale_data])
  }
  catch (err) {
    console.log(`Could not load locale ${locale}`)
    throw 'ERR_SWITCH_LOCALE'
  }
}

/**
 *
 */
const TranslationManager = Reflux.createActions({
  'initialize': { asyncResult: true },
  'switchLocale': { asyncResult: true },
  'update': { asyncResult: true },
  'import': { asyncResult: true },
  'export': { asyncResult: true }
})

TranslationManager.initialize.listen(function (docDB: IDocumentDatabase) {
  _docDB = docDB
  _docDB.bulkInsert(viewSpecs, { checkVersionTag: true }).then(() => {
    return _loadAvailableLocales()
  }).then(({ availableLocales }) => {
    this.completed(availableLocales)
  }).catch(this.failed)
})

TranslationManager.switchLocale.listen(function (locale: string) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
  _loadTranslations(locale).then(({ locale, localeData }) => {
    _setNewLocale(locale)
    this.completed(locale, localeData)
  }).catch(this.failed)
})

TranslationManager.update.listen(function (locale: string, message: TranslationType) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

TranslationManager.import.listen(function (locale: string, messages: Array<TranslationType>) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
  messages.forEach((m) => {
    m.locale = locale
  })
  _docDB.bulkInsert(messages, { checkVersionTag: true }).then(() => {
    this.completed(locale, messages)
  }).catch(this.failed)
})

TranslationManager.export.listen(function (locale: string) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

export default TranslationManager
