// @flow

import ActivityService from './actions/ActivityService'
import ExtensionManager from './actions/ExtensionManager'
import SettingManager from './actions/SettingManager'
import TranslationManager from './actions/TranslationManager'

import DocumentDatabase from './storage/DocumentDatabase'
import FileStorage from './storage/FileStorage'
import SqlDatabase from './storage/SqlDatabase'
import TripleStore from './storage/TripleStore'

import ActivityStore from './stores/ActivityStore'
import ExtensionStore from './stores/ExtensionStore'
import SettingStore from './stores/SettingStore'
import TranslationStore from './stores/TranslationStore'

exports.Actions = {
  ActivityService: ActivityService,
  ExtensionManager: ExtensionManager,
  SettingManager: SettingManager,
  TranslationManager: TranslationManager
}

exports.Storages = {
  DocumentDatabase: DocumentDatabase,
  FileStorage: FileStorage,
  SqlDatabase: SqlDatabase,
  TripleStore: TripleStore
}

exports.Stores = {
  ActivityStore: ActivityStore,
  ExtensionStore: ExtensionStore,
  SettingStore: SettingStore,
  TranslationStore: TranslationStore
}
