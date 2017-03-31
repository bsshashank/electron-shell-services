// @flow

import path from 'path'
import fs from 'fs'
import ncp from 'ncp'
import mime from 'mime'
import glob from 'glob-promise'

/**
 * Provides access to and manages a local storage
 * per user and extension
 *
 * @class FileStorage
 */
class FileStorage {

  dataDir: string
  tempDir: string

  constructor(appConfig:Object) {
    this.dataDir = appConfig.paths.data
    this.tempDir = appConfig.paths.temp
  }

  get baseFolder(): string {
    return this.dataDir
  }

  get tempFolder(): string {
    return this.tempDir
  }

  iterate(baseFolder:string, pattern:string): Promise<*> {
    let p = new Promise((resolve, reject) => {
      const searchPattern = path.join(baseFolder, pattern)
      glob(searchPattern).then((files) => {
        let info = files.map((file) => {
          return {
            folder: path.dirname(file),
            name: path.basename(file, path.extname(file)),
            ext: path.extname(file),
            type: mime.lookup(file)
          }
        })
        resolve(info)
      }).catch(reject)
    })
    return p
  }
}

export default FileStorage
