// @flow

import Reflux from 'reflux'

import path from 'path'
import fs from 'fs'

import viewSpecs from './ExtensionManager.json'

import { extensionLoader } from 'electron-shell-lib'
import type { IExtension, IFileStorage, IDocumentDatabase } from 'electron-shell'

let _docDB: IDocumentDatabase
let _fileStorage: IFileStorage
let _extensionFolder: string

/**
 * [ExtensionsManagerActions description]
 * @type {[type]}
 */
const ExtensionManager = Reflux.createActions({
  'initialize': { children: ['completed', 'failed'] },
  'mountAll': { children: ['completed', 'failed'] },
  'activate': { children: ['completed', 'failed'] },
  'deactivate': { children: ['completed', 'failed'] },
  'install': { children: ['completed', 'failed'] },
  'uninstall': { children: ['completed', 'failed'] }
})

ExtensionManager.initialize.listen(function (fileStorage: IFileStorage, docDB: IDocumentDatabase) {
  _fileStorage = fileStorage
  _docDB = docDB
  _docDB.bulkInsert(viewSpecs).then(() => {
    _extensionFolder = path.join(fileStorage.baseFolder, 'Plugins')
    if (!fs.existsSync(_extensionFolder)) {
      fs.mkdirSync(_extensionFolder)
    }
    const baseDependencies = path.join(fileStorage.appFolder, 'node_modules')
    const symlink = path.join(fileStorage.baseFolder, 'node_modules')
    if (!fs.existsSync(symlink) && (fs.existsSync(baseDependencies))) {
      fs.symlinkSync(baseDependencies, symlink, 'junction')
    }
    this.completed(_extensionFolder)
  }).catch(this.failed)
})

ExtensionManager.mountAll.listen(function () {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

ExtensionManager.activate.listen(function (extension: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

ExtensionManager.deactivate.listen(function (extension: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

ExtensionManager.install.listen(function (extension: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

ExtensionManager.uninstall.listen(function (extension: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

export default ExtensionManager
