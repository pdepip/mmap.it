import * as os from 'os';
import { app, autoUpdater, dialog, ipcMain, BrowserWindow } from 'electron';

let runningUpdate: boolean = false
let win: BrowserWindow | null = null

const version = app.getVersion();
const platform = os.platform() + '_' + os.arch();

const updateFeedUrl: any = {
    'url': 'https://mmapit.herokuapp.com/update/' + platform + '/' + version,
}

function appUpdater() {
    autoUpdater.setFeedURL(updateFeedUrl);
    
    autoUpdater.on('error', error => { 
        runningUpdate = false
        console.log(error)
    })

    autoUpdater.on('checking-for-update', () => console.log('checking for update'));
    autoUpdater.on('update-available', () => console.log('update-available'));
    autoUpdater.on('update-not-available', () => console.log('update-not-available'));

    autoUpdater.on('update-downloaded', async (event, releaseNotes, releaseName) => {
        let message = app.getName() + ' ' + releaseName + ' is now available. It will be installed next time you restart the application';

        if (releaseNotes) {
            const splitNotes = releaseNotes.split(/[^\r]\n/);
            message += '\n\nRelease Notes:\n';
            splitNotes.forEach(notes => {
                message += notes + '\n\n';
            });
        }

        const options: any = {
			type: 'question',
			buttons: ['Install and Relaunch', 'Later'],
			defaultId: 0,
			message: 'A new version of ' + app.getName() + ' has been downloaded',
			detail: message,
        }
        const { response } = await dialog.showMessageBox(options)
        if (response === 0) {
            setImmediate(() => autoUpdater.quitAndInstall())
        }
    });

    // init for updates
    autoUpdater.checkForUpdates()
}

export { appUpdater }
