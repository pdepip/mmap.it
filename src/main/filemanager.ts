import { ipcMain, dialog } from 'electron';
import * as EventEmitter from 'events';
import { Accessor } from './app/accessor';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as elasticlunr from 'elasticlunr';
import welcomeDoc from './welcome.json';
import { v4 as uuid } from 'uuid';

class FileManager extends EventEmitter {

    _accessor: Accessor; 
    _directory: string; 
    _index: any;

    constructor(accessor: Accessor) {
        super();

        this._accessor = accessor;
        this._directory = `${os.homedir()}/.mmap`;

        this._index = elasticlunr()
        this._index.saveDocument(true);
        this._index.addField('title')
        this._index.addField('text')
        this._index.setRef('id');

        this.init();
    }

    init() {

        const identityFilePath: string = `${this._directory}/.identity`

        let userId: string;
        // Check if directory exists and create if it doesn't 
        if (!fs.existsSync(identityFilePath)) {
            // create identity file
            if (!fs.existsSync(this._directory)) {
                fs.mkdirSync(this._directory, { recursive: true });
            }
            fs.writeFileSync(identityFilePath, uuid())

            this.saveFile(welcomeDoc.id, welcomeDoc.title, welcomeDoc.text, false);

            // create user metric
            userId = fs.readFileSync(identityFilePath, 'utf-8');
            this._accessor.metrics.setUserId(userId)
            this._accessor.metrics.createUser()
        } else {
            userId = fs.readFileSync(identityFilePath, 'utf-8');
            this._accessor.metrics.setUserId(userId)
            this._accessor.metrics.userLogin()
        }

        this.buildIndex()

        this.listenForIpcRenderer()
    }

    private buildIndex() {
        fs.readdir(this._directory, (err, filenames) => {
            if (err) {
                throw err
                return;
            }
            filenames.forEach((filename) => {
                // Filter out hidden files
                if (! /^\..*/.test(filename)) {
                    fs.readFile(`${this._directory}/${filename}`, 'utf-8', (err, content) => {
                        if (err) {
                            throw err;
                            return;
                        }
                        const doc: any = JSON.parse(content)
                        this._index.addDoc(doc)
                    });
                }
            });
        });
    }

    private listenForIpcRenderer() {
        ipcMain.on('fm::save', (e, id, title, text, isUpdate) => {
            this.saveFile(id, title, text, isUpdate);
            this._accessor.metrics.userSave()
        });

        ipcMain.on('fm::search', (event, query) => {
            const res: any = this.search(query)
            event.returnValue = res;
        });

        ipcMain.on('fm::delete', (event, { id, title, text }) => {
            const res: any = this.deleteFile(id, title, text)
            event.returnValue = res;
        });
    }

    private search(query: string) {
        let result: any[] = [];
        if (query === "") {
            const docs: any = this._index.documentStore.docs
            const allDocs = Object.keys(docs).map((key) => docs[key])

            allDocs.sort((a, b) => {
                return b.createdAt.localeCompare(a.createdAt)
            })
            result = allDocs.slice(0, 10)
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

    private deleteFile(id: string, title: string, text: string) {
        const filename: string = `${this._directory}/${id}.json`;

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

    private saveFile(id: string, title: string, text: string, isUpdate: boolean) {
        const filename: string = `${this._directory}/${id}.json`;

        const doc: any = {
            id,
            title,
            text,
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
