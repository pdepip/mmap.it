import { BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';
import electronLog from 'electron-log';

import base, { WindowLifecycle, WindowType } from './base';
import accessor from '../app/accessor';

let win: BrowserWindow;

class EditorWindow extends BaseWindow {
    /*
     * @param {Accessor} accessor the application acccessor for application instances
     */
    constructor(accessor: Accessor | undefined) {
        super(accessor);
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
            width: 1200,
            height: 800,
            titleBarStyle: 'hiddenInset',
            frame: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this.id = win.id;

        const urlString = super._buildUrlString();
        win.loadURL(urlString);

        // Set titlebar heightR_HEIGHT
        win.setSheetOffset(32);

        this.browserWindow = win;
    }
}

export default EditorWindow;
