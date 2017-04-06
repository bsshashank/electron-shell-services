// @flow

import path from 'path'
import fs from 'fs'
import { ncp } from 'ncp'
import mime from 'mime'
import glob from 'glob-promise'

import type { ApplicationConfig, IFileStorage, FileStorageIterationResult } from 'electron-shell-lib'

/**
 * Provides access to and manages a local storage
 * per user and extension
 *
 * @class FileStorage
 */
class FileStorage implements IFileStorage {

  config: ApplicationConfig
  extension: string

  /**
   * Creates an instance of FileStorage.
   * @param {ApplicationConfig} appConfig the application configuration object with the default paths
   * @param {string} [extension=''] the extension for which to create a file storage object
   *
   * @memberOf FileStorage
   */
  constructor(appConfig: ApplicationConfig, extension: string = '') {
    this.config = Object.freeze(appConfig)
    this.extension = extension
  }

  /**
   * a read-only property for getting the folder of the application
   *
   * @returns {string} the folder where the application resides
   */
  get appFolder(): string {
    return this.config.paths.appPath
  }

  /**
   * a read-only property for getting the base folder for the extension-specific file storage
   *
   * @returns {string} the base folder for the extension-specific file storage
   */
  get baseFolder(): string {
    return path.join(this.config.paths.data, this.extension)
  }

  /**
   * a read-only property for getting the temporary folder
   *
   * @returns {string} the temporary folder
   */
  get tempFolder(): string {
    return path.join(this.config.paths.temp, this.extension)
  }

  /**
   * iterates over the file storage base directory looking for files and folders matching the given pattern
   *
   * @param {string} pattern the pattern to look for in the base folder of the file storage
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   */
  iterate(pattern: string): Promise<Array<FileStorageIterationResult>> {
    let p = new Promise((resolve, reject) => {
      const searchPattern = path.join(this.baseFolder, pattern)
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

  /**
   * checks for the existene of a file or folder in the file storage
   *
   * @param {string} name the relative path to the file or folder in the file storage
   * @param {string} type the type to check for - either 'file' or 'folder'
   * @returns {boolean} a flag denoting whether the item exists or not
   *
   */
  exists(name:string, type: 'file' | 'folder'): boolean {
    const fsname = path.join(this.baseFolder, name)
    let nameExists = fs.existsSync(fsname)
    if (!nameExists) return false

    switch (type) {
      case 'file':
        return fs.lstatSync(fsname).isFile()

      case 'folder':
        return fs.lstatSync(fsname).isDirectory()
    }

    return nameExists
  }

  /**
   * creates a file or folder in the file storage
   *
   * @param {string} name the relative path to the file or folder in the file storage
   * @param {string} type the type to check for - either 'file' or 'folder'
   * @returns {boolean} a flag denoting whether the item has been created or not
   *
   */
  create(name:string, type: 'file' | 'folder'): boolean {
    const fsname = path.join(this.baseFolder, name)
    let existsAlready = this.exists(fsname, type)
    if (existsAlready) return true

    switch (type) {
      case 'file':
        return false

      case 'folder':
        fs.mkdirSync(fsname)
    }

    return this.exists(fsname, type)
  }

  /**
   * uploads a file to the file storage
   *
   * @param {string} fileHandle the file object of the original file
   * @param {string} location the final location of the file in the file storage relative to the base folder
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   */
  upload(fileHandle: File, location: string): Promise<*> {
    let promise = new Promise((resolve, reject) => {
      process.noAsar = true
      const fsName = path.basename(fileHandle.path)

      let fsReadStream = fs.createReadStream(fileHandle.path)
      let fsWriteStream = fs.createWriteStream(path.join(location, fsName))
      fsReadStream.pipe(fsWriteStream)

      fsWriteStream.on('error', (err) => {
        process.noAsar = false
        reject(err)
      })

      fsWriteStream.on('close', (err) => {
        process.noAsar = false
        if (err) reject(err)
        resolve({ location: location, file: fsName })
      })
    })

    return promise
  }

  /**
   * downloads a file from the file storage
   *
   * @param {string} file the relative path to the file in the file storage
   * @param {string} location the location where to save the file to
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   */
  download(file: string, location:string): Promise<*> {
    let promise = new Promise((resolve, reject) => {

    })

    return promise
  }

  /**
   * delete a file from the file storage
   *
   * @param {string} file the relative path to the file in the file storage
   * @returns {Promise} a promise object signalling either success or failure of the operation
   *
   */
  delete (file: string): Promise<*> {
    let promise = new Promise((resolve, reject) => {

    })

    return promise
  }
}

export default FileStorage
