import { app, BrowserWindow, globalShortcut } from 'electron';
import log from 'electron-log';

import { EditorWindow } from '../windows/editor';
import { SearchWindow } from '../windows/search';
import { FileManager } from '../filemanager';
import { Accessor } from './accessor';
import { appUpdater } from './autoupdate';

const isDev: boolean = require('electron-is-dev');

class App {
    // properties
    _accessor: Accessor | undefined;
    _args: object | undefined;

    editorWindow: EditorWindow | null;
    searchWindow: SearchWindow | null;

    fileManager: FileManager | null;

    appEnvironment: string | undefined;

    constructor(accessor: Accessor | undefined, args: object | undefined) {
        this._accessor = accessor;
        this._args = args || { _: [] };

        this.editorWindow = null;
        this.searchWindow = null;

        this.fileManager = null;
        this.appEnvironment = undefined;
    }

    init() {
        this.appEnvironment = process.env.NODE_ENV
        this._initializeLogger(this.appEnvironment);

        if (process.platform === 'darwin') {
            app.commandLine.appendSwitch('enable-experimental-web-platform-features', 'true');
        }

        // Mark a single instance application
        if (!process.mas && !isDev) {
            const gotSingleInstanceLock = app.requestSingleInstanceLock();
            if (!gotSingleInstanceLock) {
                process.stdout.write('Other mmap.it instance deteced: exiting')
                app.exit()
            }
        }


        app.on('ready', this.ready);

        app.on('window-all-closed', () => {
            log.info('yo in window all closed')
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('before-quit', () => {
            log.info('before quit')
            if (this.editorWindow && this.editorWindow.browserWindow) {
                this.editorWindow.browserWindow.removeAllListeners('close');
                this.editorWindow.browserWindow.close();
            } 

            if (this.searchWindow && this.searchWindow.browserWindow) {
                this.searchWindow.browserWindow.removeAllListeners('close');
                this.searchWindow.browserWindow.close();
            }
        });

        app.on('activate', () => {
            // macOS only
            // on os x it's common to re-create a window in the app
            // when the dock icon is clicked and there are no other
            // windows open
            /*/
            if (this._windowManager.windowCount === 0) {
                this.ready()
            }
             */

            this.ready();
        });

        // createTray()
    }

    ready = () => {
        // Create windows
        this.editorWindow = this._createEditorWindow();
        this.editorWindow.registerShortcut('CommandOrControl+Option+C');

        this.searchWindow = this._createSearchWindow();
        this.searchWindow.registerShortcut('Control+Space');

        this.fileManager = this._createFileManager();

        const checkOS = this._isWindowsOrmacOS();
        if (checkOS && !isDev) {
            log.info("setting up appupdater")
            // Initate auto-updates on macOs and windows
            appUpdater();
        }

        /*
        // Set up autoupdater
        if (this.editorWindow.browserWindow) {
            this.editorWindow.browserWindow.webContents.once('did-frame-finish-load', () => {
                const checkOS = this._isWindowsOrmacOS();
                if (checkOS && !isDev) {
                    // Initate auto-updates on macOs and windows
                    appUpdater();
                }
            });
        }
        */

    };

    // --- private --------------------------------

    /*
     * Creates a new editor window
     */
    _createEditorWindow() {
        const editor: EditorWindow = new EditorWindow(this._accessor);
        editor.createWindow();
        return editor;
    }

    _createSearchWindow() {
        const search: SearchWindow = new SearchWindow(this._accessor);
        search.createWindow();
        return search;
    }

    _createFileManager() {
        const fileManager: FileManager = new FileManager(this._accessor);
        return fileManager
    }

    _isWindowsOrmacOS() {
        return process.platform === 'darwin' || process.platform === 'win32';
    }

    _initializeLogger(environment) {
        /*
        log.transports.console.level = true
        log.transports.rendererConsole = null
        //log.transports.file.file = path.join(appEnvironment.paths.logPath, 'main.log')
        log.transports.file.file = "/Users/patrick.depippo/main.log"
        log.transports.file.leel = getLogLevel()
        log.transports.file.sync = true
        log.transports.file.init()
        */
    }










































}

export default App;
