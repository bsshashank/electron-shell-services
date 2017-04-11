// @flow

import Reflux from 'reflux'
import RefluxPromise from 'reflux-promise'
Reflux.use(RefluxPromise(Promise))

import path from 'path'
import fs from 'fs'

import { utils } from 'electron-shell-lib'

import viewSpecs from './ExtensionManager.json'

import type { ExtensionInfoType, IExtension, IFileStorage, IDocumentDatabase, ISettingManager, ITranslationManager } from 'electron-shell-lib'

let _docDB: IDocumentDatabase
let _fileStorage: IFileStorage
let _settingManager: ISettingManager
let _translationManager: ITranslationManager
let _extensionFolder: string

/**
 * [ExtensionsManagerActions description]
 * @type {[type]}
 */
const ExtensionManager = Reflux.createActions({
  'initialize': { asyncResult: true },
  'mountAll': { asyncResult: true },
  'activate': { asyncResult: true },
  'deactivate': { asyncResult: true },
  'install': { asyncResult: true },
  'uninstall': { asyncResult: true }
})

ExtensionManager.initialize.listen(function (fileStorage: IFileStorage, docDB: IDocumentDatabase,
                        settingManager: ISettingManager, translationManager: ITranslationManager) {
  _fileStorage = fileStorage
  _docDB = docDB
  _settingManager = settingManager
  _translationManager = translationManager
  _docDB.bulkInsert(viewSpecs, { checkVersionTag: true }).then(() => {
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
  _docDB.query('extensions/byStatus', { keys: ['active', 'deactive'] }).then(({ rows }) => {
    let plugins: Array<ExtensionInfoType> = rows.map((p) => p.value)
    this.completed(plugins)
  }).catch(this.failed)
})

ExtensionManager.activate.listen(function (extName: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
  let extension
  _docDB.lookup(extName).then((doc) => {
    extension = doc
    extension.status = 'active'
    return _docDB.save(extension)
  }).then (() => {
    this.completed(extension)
  }).catch(this.failed)
})

ExtensionManager.deactivate.listen(function (extName: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
  let extension
  _docDB.lookup(extName).then((doc) => {
    extension = doc
    extension.status = 'deactive'
    return _docDB.save(extension)
  }).then (() => {
    this.completed(extension)
  }).catch(this.failed)
})

ExtensionManager.install.listen(function (extName: string, extPackage: File) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')

  let extInfo: ExtensionInfoType
  _fileStorage.upload(extPackage, _extensionFolder).then(({ location, file }) => {
    let extension: IExtension = utils.extensionLoader.tryLoadExtension(location, file)
    console.log(extension)
    extInfo = {
      _id: `ext.${extension.id}`,
      name: extension.name,
      description: extension.description,
      version: extension.version,
      author: extension.author,
      route: extension.initialRoute,
      bannerImage: extension.bannerImage,
      hasSettings: (extension.settingView !== null),
      status: 'deactive',
      startupPoint: file,
      type: 'extension'
    }
    console.log(extInfo)
    return extension.register(_settingManager, _translationManager)
  }).then(() => {
    return _docDB.save(extInfo)
  }).then(() => {
    this.completed(extInfo)
  }).catch(this.failed)
})

ExtensionManager.uninstall.listen(function (extName: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

export default ExtensionManager
