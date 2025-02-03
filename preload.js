window.electron = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    window.electron = require('electron');
    console.log('electron configurado 2');
    
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })