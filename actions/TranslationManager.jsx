// @flow

import Reflux from 'reflux'

import { addLocaleData } from 'react-intl'

import viewSpecs from './TranslationManager.json'

import type { IDocumentDatabase } from 'electron-shell'

const _initDocumentDatabase = (docDB:IDocumentDatabase):Promise<Object> => {
  return docDB.bulkInsert(viewSpecs)
}

const _loadTranslations = (locale:string, docDB:IDocumentDatabase): Promise<*> => {
  let p = new Promise((resolve, reject) => {
    docDB.query('translations/byLocale', { key: locale, include_docs: true }).then((translations) => {
      let messages = {}
      translations.rows.forEach((row) => {
        messages[row.id] = row.doc.translation || row.doc.defaultMessage
      })
      resolve({ locale, messages })
    }).catch((err) => {
      reject(err)
    })
  })
  return p
}

const _setNewLocale = (locale:string) => {
  const idx = locale.indexOf('-')
  if (idx !== -1) {
    locale = locale.substr(0, idx)
  }
  try {
    const locale_data = require(`react-intl/locale-data/${locale}`)
    addLocaleData([...locale_data])
  }
  catch(err) {
    console.log(`Could not load locale ${locale}`)
    throw 'ERR_SWITCH_LOCALE'
  }
}

/**
 * [TranslationManagerActions description]
 * @type {[type]}
 */
const TranslationManager = Reflux.createActions({
  'switchLocale': { children: ['completed', 'failed']},
  'update': { children: ['completed', 'failed']},
  'import': { children: ['completed', 'failed']},
  'export': { children: ['completed', 'failed']}
})

TranslationManager.switchLocale.listen(function (locale:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {
    _loadTranslations(locale, docDB).then(({ locale, messages }) => {
      console.log(locale, messages)
      _setNewLocale(locale)
      this.completed(locale, messages)
    }).catch(this.failed)
  }).catch(this.failed)
})

TranslationManager.update.listen(function (locale:string, message:Object, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

TranslationManager.import.listen(function (locale:string, messages:Array<Object>, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

TranslationManager.export.listen(function (locale:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

export default TranslationManager
