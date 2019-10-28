import { 
    app, 
    BrowserWindow,
    globalShortcut,
} from 'electron';
import electron from 'electron';
import * as path from 'path';
import * as url from 'url';

import { createTray } from './tray';

let win: BrowserWindow | null;

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

const createWindow = async () => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    let displays = electron.screen.getAllDisplays();
    let width: number = 0;
    for (var i in displays) {
        width += displays[i].bounds.width;
    }

    win = new BrowserWindow(
        { 
            x: width - 800,
            y: 0,
            width: 800, 
            height: 600, 
            webPreferences: 
            { 
                nodeIntegration: true, 
            },
        });

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });
};

const createShortcuts = () => {

    const searchShortcut = globalShortcut.register(
        'CommandOrControl+Option+C',
        () => {
            if (win) win.isVisible() ? win.hide() : win.show()
        }
    );
    console.log('searchShortcut', searchShortcut);

};

app.on('ready', () => {
    if (win) win.hide();
    app.dock.hide();

    createWindow();
    createTray();

    createShortcuts();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
