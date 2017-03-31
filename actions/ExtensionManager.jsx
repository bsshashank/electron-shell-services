// @flow

import Reflux from 'reflux'

import path from 'path'
import fs from 'fs'
import uri from 'url'

import viewSpecs from './ExtensionManager.json'

import type { IFileStorage, IDocumentDatabase } from 'electron-shell'

/**
 * [_initDocumentDatabase description]
 * @param  {[type]} docDB [description]
 * @return {[type]}       [description]
 */
const _initDocumentDatabase = (docDB:IDocumentDatabase):Promise<*> => {
  return docDB.bulkInsert(viewSpecs)
}

/**
 * [_tryLoadExtension description]
 * @param {[type]} extensionFolder [description]
 * @param {[type]} extensionName [description]
 * @type {[type]}
 */
const _tryLoadExtension = (extensionFolder:string, extensionName:string):?Object => {
  let extensionInfo = null
  try {
    const extension = require(path.join(extensionFolder, extensionName))
    const extensionMeta = require(path.join(extensionFolder, extensionName, '/package.json'))
    extensionInfo = {
      component: extension.default,
      root: uri.parse(extensionFolder),
      location: extensionName,
      module: extensionMeta,
      path: extensionMeta.config.path
    }
  } catch(ex) {
    console.log(ex)
    extensionInfo = undefined
  }
  return extensionInfo
}

/**
 * [ExtensionsManagerActions description]
 * @type {[type]}
 */
const ExtensionManager = Reflux.createActions({
  'mountAll': { children: ['completed', 'failed'] },
  'activate': { children: ['completed', 'failed'] },
  'deactivate': { children: ['completed', 'failed'] },
  'install': { children: ['completed', 'failed'] },
  'uninstall': { children: ['completed', 'failed'] }
})

/**
 * [description]
 * @param  {[type]} fileStorage [description]
 * @param  {[type]} docDB       [description]
 * @return {[type]}             [description]
 */
ExtensionManager.mountAll.listen(function (fileStorage:IFileStorage, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {
    const extensionFolder = path.join(fileStorage.baseFolder, 'Plugins')
    if (!fs.existsSync(extensionFolder)) {
      fs.mkdirSync(this.extensionFolder)
    }
    const baseDependencies = path.join(fileStorage.appFolder, 'node_modules')
    const symlink = path.join(fileStorage.baseFolder, 'node_modules')
    if (!fs.existsSync(symlink) && (fs.existsSync(baseDependencies))) {
      fs.symlinkSync(baseDependencies, symlink, 'junction')
    }
  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} extension [description]
 * @param  {[type]} docDB     [description]
 * @return {[type]}           [description]
 */
ExtensionManager.activate.listen(function (extension:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} extension [description]
 * @param  {[type]} docDB     [description]
 * @return {[type]}           [description]
 */
ExtensionManager.deactivate.listen(function (extension:string, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} extension   [description]
 * @param  {[type]} fileStorage [description]
 * @param  {[type]} docDB       [description]
 * @return {[type]}             [description]
 */
ExtensionManager.install.listen(function (extension:string, fileStorage:IFileStorage, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

/**
 * [description]
 * @param  {[type]} extension   [description]
 * @param  {[type]} fileStorage [description]
 * @param  {[type]} docDB       [description]
 * @return {[type]}             [description]
 */
ExtensionManager.uninstall.listen(function (extension:string, fileStorage:IFileStorage, docDB:IDocumentDatabase) {
  _initDocumentDatabase(docDB).then(() => {

  }).catch(this.failed)
})

export default ExtensionManager
