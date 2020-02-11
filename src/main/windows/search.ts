import { BrowserWindow, ipcMain, dialog } from 'electron';
import electron from 'electron';
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

        ipcMain.on('kb::new-document', (e, doc) => {
            win.webContents.send('new-document', doc)
        });
    }

    /*
     * Creates a new search window
     *
     * @param {string}
     */
    createWindow(options = {}) {

		let display = electron.screen.getPrimaryDisplay();
		let width = display.bounds.width;

        win = new BrowserWindow({
            x: width - 700,
            y: 0,
            width: 700,
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

        // Prevent from being closed normally
        win.on('close', (e) => {
            e.preventDefault();
            win.hide();
        });

        this.browserWindow = win;
    }
}

export { SearchWindow };
