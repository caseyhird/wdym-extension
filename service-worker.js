let lastCoords = { x: 0, y: 0 };

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "wdym",
        title: "wdym?",
        contexts: ["selection"],
    });
});

/*
    TODO: record click location for a more nicely placed dialogue box


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'storeCoordinates') {
      lastCoords.x = message.x;
      lastCoords.y = message.y;
    }
  });
  */

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "wdym") {
        var highlightedText = info.selectionText;

        console.log(highlightedText);
        chrome.storage.local.set({ selectedText: highlightedText }, () => {
            chrome.action.openPopup();
        });
    }
});
