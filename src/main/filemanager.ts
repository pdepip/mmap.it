import { ipcMain } from 'electron';
import EventEmitter from 'events';
import { Accessor } from './app/accessor';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

class FileManager extends EventEmitter {

    _accessor: Accessor | undefined;
    _directory: string; 

    constructor(accessor: Accessor | undefined) {
        super();

        this._accessor = accessor;
        this._directory = os.homedir() + '/' + '.mmap';

        this.init();
    }

    init() {

        // Check if directory exists and create if it doesn't
        !fs.existsSync(this._directory) && fs.mkdirSync(this._directory);

        this._listenForIpcRenderer()
    }


    _listenForIpcRenderer() {
        ipcMain.on('fm::save', (e, id, title, text) => {
            this._saveFile(id, title, text);
        });

        ipcMain.on('fm::search', (e, query) => {
        });
    }

    _saveFile(id: number, title: string, text: string) {
        const filename: string = this._directory + '/' + id.toString() + '.json';

        const doc: any = {
            id: id.toString(),
            title: title,
            text: text,
            createdAt: new Date().toISOString(),
        }

        fs.writeFile(filename, JSON.stringify(doc), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Successfully saved ", filename);
        })
    } 
}

export { FileManager };
