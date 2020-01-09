import { BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import electronLog from 'electron-log';

import { BaseWindow, WindowLifecycle, WindowType } from './base';
import { Accessor } from '../app/accessor';

let win: BrowserWindow;

class EditorWindow extends BaseWindow {
    /*
     * @param {Accessor} accessor the application acccessor for application instances
     */
    constructor(accessor: Accessor | undefined) {
        super(accessor);

        this.init();
    }

    init() {
        this._listenForIpcRenderer()
    }

    _listenForIpcRenderer() {
        ipcMain.on('kb::hide-editor', (e) => {
            win.hide()
        });

        ipcMain.on('kb::open-document', (e, doc) => {
            win.webContents.send('document-data', doc);
            win.show();
        });
    }

    /*
     * Creates a new editor window
     *
     * @param {string}
     */
    createWindow(options = {}) {
        win = new BrowserWindow({
            x: 0,
            y: 0,
            width: 950,
            height: 650,
            useContentSize: true,
            // titleBarStyle: 'hiddenInset',
            titleBarStyle: 'hidden',
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false
            }
        });
        this.id = win.id;
        this.type = WindowType.EDITOR;

        const urlString = super._buildUrlString();
        win.loadURL(urlString);
        win.center();

        if (process.env.NODE_ENV == 'production') {
            win.hide();
        }

        // Set titlebar height
        win.setSheetOffset(32);

        // Prevent from being closed normally
        win.on('close', (e) => {
            e.preventDefault();
            win.hide();
        });

        this.browserWindow = win;
    }
}

export { EditorWindow };
