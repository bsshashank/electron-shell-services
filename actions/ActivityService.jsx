// @flow

import Reflux from 'reflux'
import RefluxPromise from 'reflux-promise'
Reflux.use(RefluxPromise(Promise))

import viewSpecs from './ActivityService.json'

import type { EventType, IDocumentDatabase } from 'electron-shell-lib'

let _docDB: IDocumentDatabase

/**
 *  Handling and managing activities done in the application
 */
const ActivityService = Reflux.createActions({
  'initialize': { asyncResult: true },
  'getByType': { asyncResult: true },
  'getByDateRange': { asyncResult: true },
  'getByIssuer': { asyncResult: true },
  'find': { asyncResult: true },
  'create': { asyncResult: true }
})

/**
 *
 * @param  {IDocumentDatabase} type  [description]
 */
ActivityService.initialize.listen(function (docDB: IDocumentDatabase) {
  _docDB = docDB
  _docDB.bulkInsert(viewSpecs).then(this.completed).catch(this.failed)
})

/**
 *
 */
ActivityService.getByType.listen(function (type: string) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

ActivityService.getByDateRange.listen(function (from: Date, to: Date) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

ActivityService.getByIssuer.listen(function (issuer: string) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

ActivityService.find.listen(function (filter: Object) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

ActivityService.create.listen(function (event: EventType) {
  if (!_docDB)
    this.failed('ERR_NOT_INITIALISED')
})

export default ActivityService
