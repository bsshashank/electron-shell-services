// @flow

import Reflux from 'reflux'

import viewSpecs from './SettingManager.json'

import type { SettingType, IDocumentDatabase } from 'electron-shell'

let _docDB: IDocumentDatabase

/**
 * [SettingsManagerActions description]
 * @type {[type]}
 */
const SettingManager = Reflux.createActions({
  'initialize': { children: ['completed', 'failed'] },
  'getByExtension': { children: ['completed', 'failed'] },
  'update': { children: ['completed', 'failed'] },
  'import': { children: ['completed', 'failed'] },
  'export': { children: ['completed', 'failed'] }
})

SettingManager.initialize.listen(function (docDB: IDocumentDatabase) {
  _docDB = docDB
  _docDB.bulkInsert(viewSpecs).then(this.completed).catch(this.failed)
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
