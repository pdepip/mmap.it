import { ipcMain, Tray, Menu } from 'electron';
import path from 'path';
import electron from 'electron';

let tray: Tray | null;

const app = electron.app;

const createTray = () => {
    tray = new Tray(path.join(__dirname, './src/assets/icons/menubarTemplate.png'));
    
    const menu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click() { app.quit(); }
        }
    ]);

    tray.setContextMenu(menu);
}

export { createTray };
