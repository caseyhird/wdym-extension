
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "wdym",
        title: "wdym?",
        // type: "normal",
        contexts: ["selection"],
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        if (info.menuItemId === "wdym") {
            var highlightedText = info.selectionText;
            // TODO: send to chat model w/ transformers.js or langchain.js
            console.log(highlightedText);
        }
    });
});