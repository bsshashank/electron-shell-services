// @flow
import PouchDB from 'pouchdb-browser'
import uuid from 'uuid'

PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('pouchdb-quick-search'))

/**
 * Provides access to a document-style database
 * that stores JSON docs and allows to index and query for them.
 *
 * @class DocumentDatabase
 */
class DocumentDatabase {

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
   *
   *
   * @param {Object} doc
   * @returns {Promise}
   */
  save (doc:Object) : Promise<*> {

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
   *
   *
   * @param {string} id
   * @returns {Promise}
   */
  get (id:string) : Promise<*> {
    return this.db.get(id)
  }

  /**
   *
   *
   * @param {string} view
   * @param {Object} options
   * @returns {Promise}
   */
  query(view:string, options:Object) : Promise<*> {
    return this.db.query(view, options)
  }

  /**
   * [docs description]
   * @type {[type]}
   */
  bulkInsert (docs:Array<Object>) : Promise<*> {
    let p = new Promise((resolve, reject) => {
      let items = docs.map((doc) => this.save(doc))
      Promise.all(items).then(resolve).catch(reject)
    })
    return p
  }
}

export default DocumentDatabase
