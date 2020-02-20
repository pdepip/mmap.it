import * as electron from 'electron';
import * as path from 'path';

let tray: electron.Tray | null;

const app = electron.app;

const createTray = () => {
    tray = new electron.Tray(path.join(__dirname, './src/assets/icons/menubarTemplate.png'));
    
    const menu = electron.Menu.buildFromTemplate([
        {
            label: 'Quit',
            click() { app.quit(); }
        }
    ]);

    tray.setContextMenu(menu);
}

export { createTray };
