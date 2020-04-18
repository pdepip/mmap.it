import {
    app,
    BrowserWindow,
    globalShortcut,
    ipcMain,
    screen,
} from 'electron';
import * as EventEmitter from 'events';
import * as path from 'path';
import * as url from 'url';

import { Accessor } from '../app/accessor';

export enum WindowType {
    BASE = 'base',
    EDITOR = 'editor',
    SEARCH = 'search'
}

export enum WindowLifecycle {
    NONE = 0,
    LOADING = 1,
    READY = 2,
    QUITTED = 3
}

class BaseWindow extends EventEmitter {

    // properties
    _accessor: Accessor; 
    id: number | null;
    browserWindow: BrowserWindow | null;
    lifecycle: WindowLifecycle;
    type: WindowType;

    constructor(accessor: Accessor) {
        super();

        this._accessor = accessor;
        this.id = null;
        this.browserWindow = null;
        this.lifecycle = WindowLifecycle.NONE;
        this.type = WindowType.BASE;
    }

    registerShortcut(key: string) {
        const shortcut = globalShortcut.register(key, () => {
            if (this.browserWindow) {

                // Handle hiding window
                if (this.browserWindow.isVisible()) {

                    if (this.type === WindowType.SEARCH) {
                        this.browserWindow.webContents.send('rnd::hide-search')
                    } else if (this.type === WindowType.EDITOR) {
                        this.browserWindow.webContents.send('rnd::hide-editor')
                    }

                    this.browserWindow.hide();

                // Handle showing window
                } else {
                    // For multiple monitors
                    this.browserWindow.setVisibleOnAllWorkspaces(true); // put the window on all screens
                    this.browserWindow.show(); // focus the window up front on the active screen
                    this.browserWindow.setVisibleOnAllWorkspaces(false); // disable all screen behavior

					// Get mouse cursor absolute position
                    const {x, y} = screen.getCursorScreenPoint();
					// Find the display where the mouse cursor will be
                    const currentDisplay = screen.getDisplayNearestPoint({ x, y });
					// Set window position to that display coordinates
                    this.browserWindow.setPosition(currentDisplay. workArea.x, currentDisplay. workArea.y);
					// Center window relatively to that display
                    if (this.type === WindowType.EDITOR) {
					    this.browserWindow.center();
                    } else if (this.type === WindowType.SEARCH) {
                        const width = currentDisplay.bounds.width;
                        // this.browserWindow.setPosition(currentDisplay.workArea.x + width - 700, 0)
                        this.browserWindow.setPosition(
                            currentDisplay.workArea.x + width - this.browserWindow.getBounds().width, 
                            currentDisplay.workArea.y
                        )
                    }

                    // Make sure search is always on top
                    if (this.type === WindowType.SEARCH) {
                        this.browserWindow.setAlwaysOnTop(true, "floating", 1);

                        this._accessor.metrics.userSearch()

                        this.browserWindow.webContents.send('rnd::focus-search')
                    } 

					// Display the window
                    this.browserWindow.show();
                }
            }
        });
    }



    reload() {
        if (this.browserWindow) this.browserWindow.reload();
    }

    destroy() {
        this.lifecycle = WindowLifecycle.QUITTED;
        super.emit('window-closed');

        super.removeAllListeners();
        if (this.browserWindow) {
            this.browserWindow.destroy();
            this.browserWindow = null;
        }
        this.id = null;
    }

    buildUrlString() {
        let winUrl: string;
        if (process.env.NODE_ENV === 'development') {
            winUrl = 'http://localhost:2003';
        } else {
            winUrl = url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file',
                slashes: true
            });
        }

        winUrl += `?type=${this.type}`;

        return winUrl;
    }
}

export { BaseWindow };
