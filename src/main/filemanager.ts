import { ipcMain, dialog } from 'electron';
import EventEmitter from 'events';
import { Accessor } from './app/accessor';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as elasticlunr from 'elasticlunr';

class FileManager extends EventEmitter {

    _accessor: Accessor | undefined;
    _directory: string; 
    _index: any;

    constructor(accessor: Accessor | undefined) {
        super();

        this._accessor = accessor;
        this._directory = os.homedir() + '/' + '.mmap';

        this._index = elasticlunr()
        this._index.saveDocument(true);
        this._index.addField('title')
        this._index.addField('text')
		this._index.setRef('id');

        this.init();
    }

    init() {

        // Check if directory exists and create if it doesn't
        !fs.existsSync(this._directory) && fs.mkdirSync(this._directory);

        this._buildIndex()

        this._listenForIpcRenderer()
    }

    _buildIndex() {
        fs.readdir(this._directory, (err, filenames) => {
		if (err) {
          throw err
		  return;
		}
        filenames.forEach((filename) => {
          fs.readFile(this._directory + '/' + filename, 'utf-8', (err, content) => {
		    if (err) {
              throw err;
			  return;
			}
            let doc: any = JSON.parse(content)
            this._index.addDoc(doc)
		  });
		});
	  });
    }

    _listenForIpcRenderer() {
        ipcMain.on('fm::save', (e, id, title, text, isUpdate) => {
            this._saveFile(id, title, text, isUpdate);
        });

        ipcMain.on('fm::search', (event, query) => {
            const res: any = this._search(query)
            event.returnValue = res;
        });

        ipcMain.on('fm::delete', (event, { id, title, text }) => {
            const res: any = this._deleteFile(id, title, text)
            event.returnValue = res;
        });
    }

	_search(query: string) {
        let result: any[] = [];
        if (query == "") {
            const docs: any = this._index.documentStore.docs
            const allDocs = Object.keys(docs).map((key) => docs[key])

            allDocs.sort((a, b) => {
                return b.createdAt.localeCompare(a.createdAt)
            })
            return allDocs.slice(0, 10)
        } else {
            this._index.search(query, {
                fields: {
                    title: { boost: 2 },
                },
                bool: 'OR',
                expand: true,
            })
            .map(({ ref, score }) => {
                const doc: any = this._index.documentStore.getDoc(ref)
                const obj: any = { text: doc.text, id: doc.id, title: doc.title };
                result.push(obj)
            })
        }
        return result        
    }

    _deleteFile(id: string, title: string, text: string) {
        const filename: string = this._directory + '/' + id + '.json';

        const doc: any = { id, title, text }

        const options: any = {
            type: 'question',
            buttons: ['Yes Delete', 'No'],
            defaultId: 0,
            message: "Are you sure you'd like to delete this item?",
            detail: title,
        }
        console.log('DELETING:', filename);
        try {
            fs.unlinkSync(filename)
        } catch (err)  {
            console.log('failed to delete file', err)
            throw err
        }

        // remove from index
        this._index.removeDoc(doc);

        return id
    }

    _saveFile(id: string, title: string, text: string, isUpdate: boolean) {
        const filename: string = this._directory + '/' + id + '.json';

        const doc: any = {
            id: id,
            title: title,
            text: text,
            createdAt: new Date().toISOString(),
        }

        if (isUpdate) {
            this._index.updateDoc(doc);
        } else {
            this._index.addDoc(doc);
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
