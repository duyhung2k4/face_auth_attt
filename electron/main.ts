import { app, BrowserWindow, ipcMain } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { decryptFilePassWord, encryptFilePassword } from './utils/coding_password'
import { decryptFileFace, encryptFileFace } from './utils/coding_face'

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            contextIsolation: true,
        },
        autoHideMenuBar: true,
        width: 1280,
        height: 720,
        resizable: false,
    })

    
    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        if(!win) return;
        win.webContents.executeJavaScript(`localStorage.setItem('argv', JSON.stringify(${JSON.stringify(process.argv)}))`);
        win.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}







// Handle Add
ipcMain.handle('get-file-path', () => {
    return process.argv[1]; // Trả về đường dẫn file đã chọn từ context menu
});

// use-password
ipcMain.handle('encrypt-file-password', async (_, filePath, password) => {
    encryptFilePassword(filePath, password);
    return `File ${filePath} đã được mã hóa thành công.`;
});
ipcMain.handle('decrypt-file-password', async (_, filePath, password) => {
    decryptFilePassWord(filePath, password);
    return `File ${filePath} đã được mã hóa thành công.`;
});

// use-face
ipcMain.handle('encrypt-file-face', async (_, filePath, key) => {
    encryptFileFace(filePath, key);
    return `File ${filePath} đã được mã hóa thành công.`;
});
ipcMain.handle('decrypt-file-face', async (_, filePath, key) => {
    decryptFileFace(filePath, key);
    return `File ${filePath} đã được mã hóa thành công.`;
});







// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {        
        createWindow()
    }
})

app.whenReady().then(createWindow)
