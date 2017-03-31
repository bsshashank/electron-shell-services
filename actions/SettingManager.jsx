// @flow

import Reflux from 'reflux'

import viewSpecs from './SettingManager.json'

import type { IDocumentDatabase } from 'electron-shell'

/**
 * [_initDocumentDatabase description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
const _initDocumentDatabase = (docDB:IDocumentDatabase):Promise<*> => {
  return docDB.bulkInsert(viewSpecs)
}

/**
 * [SettingsManagerActions description]
 * @type {[type]}
 */
const SettingManager = Reflux.createActions({
  'getAll': { children: ['completed', 'failed'] },
  'getByExtension': { children: ['completed', 'failed'] },
  'update': { children: ['completed', 'failed'] },
  'import': { children: ['completed', 'failed'] },
  'export': { children: ['completed', 'failed'] }
})

/**
 * [description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
SettingManager.getAll.listen(function (docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} extension [description]
 * @param  {[type]} docDB     [description]
 * @return {[type]}           [description]
 */
SettingManager.getByExtension.listen(function (extension:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} setting [description]
 * @param  {[type]} docDB   [description]
 * @return {[type]}         [description]
 */
SettingManager.update.listen(function (setting:Object, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} settings [description]
 * @param  {[type]} docDB    [description]
 * @return {[type]}          [description]
 */
SettingManager.import.listen(function (settings:Array<Object>, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
SettingManager.export.listen(function (docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

export default SettingManager
