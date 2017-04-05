// @flow
import PouchDB from 'pouchdb-browser'
import uuid from 'uuid'

PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('pouchdb-quick-search'))

import type { ApplicationConfig, DocumentDatabaseLookupOptions, DocumentDatabaseQueryOptions, IDocumentDatabase } from 'electron-shell'

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
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  save(doc: Object): Promise<*> {
    if (!doc._id) {
      doc._id = uuid.v4()
    }

    if (!doc.timestamp) {
      doc.timestamp = new Date()
    }

    var promise = Promise.resolve(this.db.get(doc._id).then((result) => {
      if ((result.version === undefined) || (result.version !== doc.version)) {
        doc._rev = result._rev
        return this.db.put(doc)
      }
      return true
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
  lookup(id:string, options:?DocumentDatabaseLookupOptions): Promise<*> {
    return this.db.get(id, options)
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
  query(view:string, options:?DocumentDatabaseQueryOptions): Promise<*> {
    return this.db.query(view, options)
  }

  /**
   * inserts multiple objects as bulk into the database
   *
   * @param {Array<Object>} docs the array of documents to insert into the database
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   * @memberOf IDocumentDatabase
   */
  bulkInsert(docs:Array<Object>): Promise<*> {
    let p = new Promise((resolve, reject) => {
      let items = docs.map((doc) => this.save(doc))
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
