window.electron = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  window.electron = require('electron');
  console.log('electron configurado 2');

  // Quero colocar uma string no formato html e inserir sendo o primeiro elemento do body da pagina.
  let htmlBarApp = `<div class="barra barraApp">
        <span>Meu Projeto</span>
        <div class="botoes">
          <button id="minimizar">-</button>
          <button id="maximizar">+</button>
          <button id="fechar">x</button>
        </div>
      </div>`
  document.body.insertAdjacentHTML('afterbegin', htmlBarApp);

  let cssBarrApp = `
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 30px;
  background-color: #333;
  color: #fff;
}

.logo {
  width: 20px;
  height: 20px;
  background-color: #fff;
  margin-right: 10px;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.menu-item {
  margin-right: 20px;
}

.nav-button {
  width: 20px;
  height: 20px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

#search-input {
  width: 200px;
  height: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.window-controls {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
}

.window-controls button {
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

.barra {
  -webkit-app-region: no-drag;
  height: 30px;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  user-select: none;
  cursor: move;
}

.botoes {
  display: flex;
  gap: 5px;
}

.botoes button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 5px 10px;
}

.botoes button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
  `
  let styleBarAppEl = document.createElement('style');
  styleBarAppEl.innerHTML = cssBarrApp;
  document.head.appendChild(styleBarAppEl);

  let jsBarApp = document.createElement('script');
  jsBarApp.innerHTML = `
const { ipcRenderer } = window.electron;

document.getElementById('minimizar').addEventListener('click', () => {
    ipcRenderer.send('minimizar');
});

document.getElementById('maximizar').addEventListener('click', () => {
    ipcRenderer.send('maximizar');
});

document.getElementById('fechar').addEventListener('click', () => {
    ipcRenderer.send('fechar');
});

const barra = document.querySelector('.barraApp');
var isDragging = false;
var startPosition = { x: 0, y: 0 };
barra.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = {
        x: e.clientX,
        y: e.clientY
    };
    document.addEventListener('mousemove', arrastar);
    document.addEventListener('mouseup', pararArrastar);
});

function arrastar(e) {
    console.log("Arrastando");
    
    if (!isDragging) {
        console.log("Não está arrastando");
        return;
    }
    if(e.buttons === 1) {
        const deltaX = e.screenX - startPosition.x;
        const deltaY = e.screenY - startPosition.y;
        ipcRenderer.send('moveappwin', {
            posX: deltaX,
            posY: deltaY
        });
    }
}

function pararArrastar() {
    isDragging = false;
    document.removeEventListener('mousemove', arrastar);
    document.removeEventListener('mouseup', pararArrastar);
}
  `
  document.body.appendChild(jsBarApp);
})