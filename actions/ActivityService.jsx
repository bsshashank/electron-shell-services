// @flow

import Reflux from 'reflux'

import viewSpecs from './ActivityService.json'

import type { IDocumentDatabase } from 'electron-shell'

const _initDocumentDatabase = (docDB:IDocumentDatabase):Promise<Object> => {
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

ActivityService.getByType.listen(function (type:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

ActivityService.getByDateRange.listen(function (from:Date, to:Date, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

ActivityService.getByIssuer.listen(function (issuer:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

ActivityService.find.listen(function (filter:Object, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

ActivityService.create.listen(function (event:Object, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

export default ActivityService
