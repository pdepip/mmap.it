import { app, BrowserWindow, globalShortcut } from 'electron';

import editor from '../windows/editor';
import accessor from './accessor';

class App {
    // properties
    _accessor: Accessor | undefined;
    _args: object | undefined;

    constructor(accessor: Accessor | undefined, args: object | undefined) {
        this._accessor = accessor;
        this._args = args || { _: [] };
        // this._windowManager = this._accessor.windowManager
    }

    init() {
        if (process.platform === 'darwin') {
            app.commandLine.appendSwitch('enable-experimental-web-platform-features', 'true');
        }

        app.on('ready', this.ready);

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
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
        console.log('Ready, launching windows');
        this._createEditorWindow();
    };

    // --- private --------------------------------

    /*
     * Creates a new editor window
     */
    _createEditorWindow() {
        const editor: EditorWindow = new EditorWindow(this._accessor);
        editor.createWindow();
        // this._windowManager.add(editor)
        return editor;
    }

    _createSearchWindow() {}
}

export default App;
