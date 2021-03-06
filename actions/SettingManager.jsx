// @flow

import Reflux from 'reflux'
import RefluxPromise from 'reflux-promise'
Reflux.use(RefluxPromise(Promise))

import viewSpecs from './SettingManager.json'

import type { SettingType, IDocumentDatabase } from 'electron-shell-lib'

let _docDB: IDocumentDatabase

const _loadAllSettings = (): Promise<*> => {
  let p = new Promise((resolve, reject) => {
    if (!_docDB) reject('ERR_NOT_INITIALISED')
    _docDB.query('settings/all').then(({ rows }) => {
      let settings = {}
      rows.forEach(r => {
        if (!settings[r.value.namespace]) {
          settings[r.value.namespace] = {}
        }
        settings[r.value.namespace][r.value.name] = r.value.value
      })
      resolve({ settings })
    }).catch(reject)
  })
  return p
}

/**
 * [SettingsManagerActions description]
 * @type {[type]}
 */
const SettingManager = Reflux.createActions({
  'initialize': { asyncResult: true },
  'update': { asyncResult: true },
  'import': { asyncResult: true },
  'export': { asyncResult: true }
})

SettingManager.initialize.listen(function (docDB: IDocumentDatabase) {
  _docDB = docDB
  _docDB.bulkInsert(viewSpecs, { checkVersionTag: true }).then(() => {
    return _loadAllSettings()
  }).then(({ settings }) => {
    this.completed(settings)
  }).catch(this.failed)
})

SettingManager.update.listen(function (namespace:string, name:string, value:Object) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
  _docDB.query('settings/byName', { key: `${namespace}.${name}` }).then(({ rows }) => {
    let setting = rows[0].value
    setting.value = value
    return _docDB.save(setting)
  }).then((doc) => {
    this.completed(namespace, name, value)
  }).catch(this.failed)
})

SettingManager.import.listen(function (settings: Array<SettingType>) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
  settings.forEach(s => s._id =`env:${s.namespace}.${s.name}`)
  _docDB.bulkInsert(settings, { checkVersionTag: true }).then(() => {
    return _loadAllSettings()
  }).then(({ settings }) => {
    this.completed(settings)
  }).catch(this.failed)
})

SettingManager.export.listen(function () {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

export default SettingManager
