import { BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import electronLog from 'electron-log';

import { BaseWindow, WindowLifecycle, WindowType } from './base';
import { Accessor } from '../app/accessor';

let win: BrowserWindow;

class SearchWindow extends BaseWindow {
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
        ipcMain.on('kb::hide-search', (e) => {
            win.hide()
        });
    }

    /*
     * Creates a new search window
     *
     * @param {string}
     */
    createWindow(options = {}) {
        win = new BrowserWindow({
            x: 0,
            y: 0,
            width: 600,
            height: 500,
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
        this.type = WindowType.SEARCH;

        const urlString = super._buildUrlString();
        win.loadURL(urlString);

        if (process.env.NODE_ENV == 'production') {
            win.hide();
        }

        // Set titlebar height
        win.setSheetOffset(32);

        this.browserWindow = win;
    }
}

export { SearchWindow };
