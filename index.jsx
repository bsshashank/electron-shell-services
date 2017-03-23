// @flow

import ActivityService from './services/ActivityService'
import BackgroundTaskService from './services/BackgroundTaskService'
import ExtensionManager from './services/ExtensionManager'
import SettingsManager from './services/SettingsManager'

import DocumentDatabase from './storage/DocumentDatabase'
import FileStorage from './storage/FileStorage'
import SqlDatabase from './storage/SqlDatabase'
import TripleStore from './storage/TripleStore'

exports.Services = {
  ActivityService: ActivityService,
  BackgroundTaskService: BackgroundTaskService,
  ExtensionManager: ExtensionManager,
  SettingsManager: SettingsManager
}

exports.Storages = {
  DocumentDatabase: DocumentDatabase,
  FileStorage: FileStorage,
  SqlDatabase: SqlDatabase,
  TripleStore: TripleStore
}
