const { app, BrowserWindow, ipcMain, Menu, nativeTheme } = require('electron/main')
const path = require('node:path')

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        // frame: false, // Desativa a barra padrão
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload_app_bar.js')
        }
    })

    // mainWindow.loadFile('index.html')
    mainWindow.loadURL('https://www.google.com/')


    // Adicione um botão para abrir DevTools
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow()

    Menu.setApplicationMenu(null);
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.setUserTasks([
    {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
    }
])

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


ipcMain.on('abrir-arquivo', () => {
    console.log('Abrir arquivo');
    // Executar ação correspondente
    // ipcRenderer.send('resposta-backend', 'Arquivo aberto!');
});


ipcMain.on('minimizar', () => {
    mainWindow.minimize();
});
ipcMain.on('maximizar', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});
ipcMain.on('fechar', () => {
    mainWindow.close();
    // Eu quero que o app seja minimizado para a barra de tarefas do windows, como se fosse um app normal.
});

ipcMain.on('moveappwin', (event, objSended) => {
    if (!mainWindow.isMaximized()) {
        mainWindow.setPosition(objSended.posX, objSended.posY);
    }else{
        mainWindow.unmaximize();
    }
});