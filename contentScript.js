/*

    TODO: record click location for a more nicely placed dialogue box

    When this is ready, add
    "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["contentScript.js"]
    }
  ],
  into manifest.json

  

*/

let lastMouseX = 0;
let lastMouseY = 0;

document.addEventListener('contextmenu', (event) => {
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;

  // Send coordinates to background script
  chrome.runtime.sendMessage({
    type: 'storeCoordinates',
    x: lastMouseX,
    y: lastMouseY
  });
});
