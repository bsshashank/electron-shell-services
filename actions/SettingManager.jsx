// @flow

import Reflux from 'reflux'
import RefluxPromise from 'reflux-promise'
Reflux.use(RefluxPromise(Promise))

import viewSpecs from './SettingManager.json'

import type { SettingType, IDocumentDatabase } from 'electron-shell-lib'

let _docDB: IDocumentDatabase

/**
 * [SettingsManagerActions description]
 * @type {[type]}
 */
const SettingManager = Reflux.createActions({
  'initialize': { asyncResult: true },
  'getByExtension': { asyncResult: true },
  'update': { asyncResult: true },
  'import': { asyncResult: true },
  'export': { asyncResult: true }
})

SettingManager.initialize.listen(function (docDB: IDocumentDatabase) {
  _docDB = docDB
  _docDB.bulkInsert(viewSpecs, { checkVersionTag: true }).then(this.completed).catch(this.failed)
})

SettingManager.getByExtension.listen(function (extension: string) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

SettingManager.update.listen(function (setting: SettingType) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

SettingManager.import.listen(function (settings: Array<SettingType>) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

SettingManager.export.listen(function () {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

export default SettingManager
