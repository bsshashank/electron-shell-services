// @flow
import PouchDB from 'pouchdb-browser'
import uuid from 'uuid'

PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('pouchdb-quick-search'))

import type { ApplicationConfig, IDocumentDatabase } from 'electron-shell-lib'

/**
 * Provides access to a document-style database
 * that stores JSON docs and allows to index and query for them.
 *
 * @class DocumentDatabase
 */
class DocumentDatabase implements IDocumentDatabase {

  /**
   *
   *
   * @type {PouchDB}
   */
  db: PouchDB

  /**
   * Creates an instance of DocumentDatabase.
   *
   * @param {string} dbName
   * @param {number} [dbVersion=1]
   */
  constructor (dbName:string, dbVersion:number = 1) {
    this.db = new PouchDB(`${dbName}.${dbVersion}`, {
      adapter: 'idb',
      storage: 'persistent'
    })
  }

  /**
   * stores a document object into the database
   *
   * @param {Object} doc the document that should be persisted into the database
   * @param {DocumentDatabaseSaveOptions} options the options object with additional parameters for the database save
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  save(doc: Object, options?:{ checkVersionTag?: boolean, addTimestamp?: boolean }): Promise<*> {
    if (!doc._id) {
      doc._id = uuid.v4()
    }

    if ((options) && (options.addTimestamp) && (!doc.timestamp)) {
      doc.timestamp = new Date()
    }

    var promise = Promise.resolve(this.db.get(doc._id).then((result) => {
      doc._rev = result._rev
      if ((options) && (options.checkVersionTag)) {
        if (result.version !== doc.version)
          return this.db.put(doc)
        else
          return doc
      }
      return this.db.put(doc)
    }).catch((err) => {
      if (err.status == 404) {
        return this.db.put(doc)
      } else {
        throw err
      }
    }))

    return promise
  }

  /**
   * lookup a document from the database by it's unique id
   *
   * @param {string} id the unique id of the document to be retrieved
     * @param {DocumentDatabaseLookupOptions} options the options object with additional parameters for the database lookup
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  lookup(id:string, options?:{ rev?: string, revs?: boolean, revs_info?: boolean, conflicts?: boolean, attachments?: boolean }): Promise<*> {
    if (options) {
      return this.db.get(id, options)
    }
    return this.db.get(id)
  }

  /**
   * queries a specific view in the database with some search options
   *
   * @param {string} view the name of the view in the database to use
   * @param {DocumentDatabaseQueryOptions} options the options object with additional parameters for the querying the view
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  query(view:string, options?:{ reduce?: boolean | string, include_docs?: boolean, conflicts?: boolean, attachments?: boolean,
        startkey?: string, endkey?: string, limit?: number, skip?: number, descending?: boolean, key?: string, keys?: Array<string>,
        group?: boolean, group_level?: number }): Promise<*> {
    return this.db.query(view, options)
  }

  /**
   * inserts multiple objects as bulk into the database
   *
   * @param {Array<Object>} docs the array of documents to insert into the database
   * @param {DocumentDatabaseSaveOptions} options the options object with additional parameters for the database save
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  bulkInsert(docs:Array<Object>, options?:{ checkVersionTag?: boolean, addTimestamp?: boolean }): Promise<*> {
    let p = new Promise((resolve, reject) => {
      let items = docs.map((doc) => this.save(doc, options))
      Promise.all(items).then(resolve).catch(reject)
    })
    return p
  }

  /**
   * removes an object from the database
   *
   * @param {string} id the unique id of the document to be removed
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  remove(id:string): Promise<*> {
    return this.db.remove(id)
  }
}

export default DocumentDatabase
