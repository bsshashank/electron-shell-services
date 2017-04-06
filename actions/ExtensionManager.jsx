// @flow

import Reflux from 'reflux'

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
  'initialize': { children: ['completed', 'failed'] },
  'mountAll': { children: ['completed', 'failed'] },
  'activate': { children: ['completed', 'failed'] },
  'deactivate': { children: ['completed', 'failed'] },
  'install': { children: ['completed', 'failed'] },
  'uninstall': { children: ['completed', 'failed'] }
})

ExtensionManager.initialize.listen(function (fileStorage: IFileStorage, docDB: IDocumentDatabase,
                        settingManager: ISettingManager, translationManager: ITranslationManager) {
  _fileStorage = fileStorage
  _docDB = docDB
  _settingManager = settingManager
  _translationManager = translationManager
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

ExtensionManager.activate.listen(function (extName: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

ExtensionManager.deactivate.listen(function (extName: string) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')
})

ExtensionManager.install.listen(function (extName: string, extPackage: File) {
  if ((!_docDB) || (!_fileStorage) || (!_extensionFolder))
    this.failed('ERR_NOT_INITIALISED')

  let extInfo: ExtensionInfoType
  _fileStorage.upload(extPackage, _extensionFolder).then(({ location, file }) => {
    let extension: IExtension = utils.extensionLoader.tryLoadExtension(location, file)
    console.log(extension)
    extInfo = {
      _id: extension.id,
      name: extension.name,
      description: extension.description,
      version: extension.version,
      author: extension.author,
      route: extension.initialRoute,
      bannerImage: extension.bannerImage,
      state: 'deactive',
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
