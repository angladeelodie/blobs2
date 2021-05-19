const { app, BrowserWindow } = require("electron");

let win = null;

function createWindow() {
    win = new BrowserWindow({
        //on peut regler plein de trucs, opacité de la fenêtre et tout
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.loadFile("index2.html");
}

function initBot() {
    const { Bot } = require("./Bot");
    const config = require('../config.json');
    new Bot(
        config.token,
        win
    );
}

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow).then(initBot);
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
