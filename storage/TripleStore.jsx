// @flow
import { Store } from 'rdfstore'

import type { ITripleStore } from 'electron-shell'

/**
 * Provides access to a RDF triple store (aka graph-style database).
 *
 * @class TripleStore
 */
class TripleStore implements ITripleStore {

  db: Object

  /**
   * Creates an instance of TripleStore.
   *
   * @param {any} dbName
   * @param {number} [dbVersion=1]
   */
  constructor (dbName:string, dbVersion:number = 1) {
    Store({ persistent: true, name: `${dbName}.${dbVersion}` }, (err, db) => {
      this.db = db
    })
  }
}

export default TripleStore
