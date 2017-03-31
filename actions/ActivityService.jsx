// @flow

import Reflux from 'reflux'

import viewSpecs from './ActivityService.json'

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
 * [ActivityService description]
 * @type {[type]}
 */
const ActivityService = Reflux.createActions({
  'getByType': { children: ['completed', 'failed'] },
  'getByDateRange': { children: ['completed', 'failed'] },
  'getByIssuer': { children: ['completed', 'failed'] },
  'find': { children: ['completed', 'failed'] },
  'create': { children: ['completed', 'failed'] }
})

/**
 * [description]
 * @param  {[type]} type  [description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
ActivityService.getByType.listen(function (type:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} from  [description]
 * @param  {[type]} to    [description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
ActivityService.getByDateRange.listen(function (from:Date, to:Date, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} issuer [description]
 * @param  {[type]} docDB  [description]
 * @return {[type]}        [description]
 */
ActivityService.getByIssuer.listen(function (issuer:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} filter [description]
 * @param  {[type]} docDB  [description]
 * @return {[type]}        [description]
 */
ActivityService.find.listen(function (filter:Object, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} event [description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
ActivityService.create.listen(function (event:Object, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

export default ActivityService
