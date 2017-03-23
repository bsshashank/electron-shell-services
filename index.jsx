// @flow

import ActivityService from './services/ActivityService'
import BackgroundTaskService from './services/BackgroundTaskService'
import ExtensionManager from './services/ExtensionManager'
import LanguageService from './services/LanguageService'
import RouteHandler from './services/RouteHandler'
import SettingsManager from './services/SettingsManager'

import DocumentDatabase from './storage/DocumentDatabase'
import FileStorage from './storage/FileStorage'
import SqlDatabase from './storage/SqlDatabase'
import TripleStore from './storage/TripleStore'

exports.services = {
  ActivityService: ActivityService,
  BackgroundTaskService: BackgroundTaskService,
  ExtensionManager: ExtensionManager,
  LanguageService: LanguageService,
  RouteHandler: RouteHandler,
  SettingsManager: SettingsManager
}

exports.storage = {
  DocumentDatabase: DocumentDatabase,
  FileStorage: FileStorage,
  SqlDatabase: SqlDatabase,
  TripleStore: TripleStore
}
