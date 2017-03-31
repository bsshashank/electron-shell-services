// @flow

import Reflux from 'reflux'

import path from 'path'
import fs from 'fs'
import uri from 'url'

/*
        this.fileStorage = fileStorage
        this.extensionFolder = path.join(this.fileStorage.baseFolder, 'Plugins')
        if(!fs.existsSync(this.extensionFolder)) {
          fs.mkdirSync(this.extensionFolder)
        }
        const baseDependencies = path.join(appPath, 'node_modules')
        const symlink = path.join(this.fileStorage.baseFolder, 'node_modules')
        if (!fs.existsSync(symlink) && (fs.existsSync(baseDependencies))) {
          fs.symlinkSync(baseDependencies, symlink, 'junction')
        }

  _tryLoadExtension(extensionName: string): any {
    let extensionInfo: any = null
    try {
      const extension = require(path.join(this.extensionFolder, extensionName))
      const extensionMeta = require(path.join(this.extensionFolder, extensionName, '/package.json'))
      extensionInfo = {
        component: extension.default,
        root: uri.parse(this.extensionFolder),
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
*/

/**
 * [ExtensionsManagerActions description]
 * @type {[type]}
 */
const ExtensionsManager = Reflux.createActions([
  'mountAll',
  'activate',
  'deactivate',
  'install',
  'uninstall'
])

export default ExtensionsManager
