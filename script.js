const { ipcRenderer } = require('electron');

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