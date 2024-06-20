const { app, BrowserWindow } = require("electron");

//  Configuração para recarregar a janela do Electron automaticamente
const path = require("path");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron"),
});

// ========================================================


// Criar janela do Electron
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "src/assets/icon.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Carregar o arquivo HTML
  win.loadFile("src/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

// ========================================================