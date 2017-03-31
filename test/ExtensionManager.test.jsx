import type { ApplicationConfig, IFileStorage } from 'electron-shell'
import FileStorage from '../storage/FileStorage'
import ExtensionManager from '../services/ExtensionManager'



describe('File Storage Test', () => {
    let fileStorage: IFileStorage
    let testAppConfig: ApplicationConfig = {
        paths: {}
    }

    beforeAll(() => {
        console.log("Test: before all")
        testAppConfig.paths.data = "C:/tmp/extension/data"
        testAppConfig.paths.temp = "C:/tmp/extension/tmp"
        testAppConfig.paths.appPath = "C:/repo/inspekt/electron-shell"

        fileStorage = new FileStorage(testAppConfig)
    });

    test('initialize AppConfig', () => {
        console.log("Test: Initialize AppConfig")
        expect(testAppConfig.paths.data).toBe("C:/tmp/extension/data")
        expect(testAppConfig.paths.temp).toBe("C:/tmp/extension/tmp")
        expect(testAppConfig.paths.appPath).toBe("C:/repo/inspekt/electron-shell")
    });

    test('initialized FileStorage', () => {
        console.log("Test: Initialize File Storage")
        expect(fileStorage.baseFolder).toBe("C:/tmp/extension/data")
        expect(fileStorage.tempFolder).toBe("C:/tmp/extension/tmp")
    });

    test.skip('initialized ExtensionManager', () => {
        console.log("Test: Initialize Extension Manager")
        let extensionManager = new ExtensionManager(testAppConfig, fileStorage)
        
        extensionInfo = extensionManager._tryLoadExtension("hello.asar");
        console.log(extensionInfo);
    });

});