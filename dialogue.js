document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
  
    // Load the selected text
    chrome.storage.local.get("selectedText", (data) => {
      if (data.selectedText) {
        addMessage("User", data.selectedText);
        // Simulate a response from the chat system
        setTimeout(() => {
          addMessage("ChatBot", "This is a response to: " + data.selectedText);
        }, 500);
      }
    });
  
    // Add a message to the chat
    function addMessage(sender, text) {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${sender}: ${text}`;
      chatContainer.appendChild(messageElement);
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }
  
    // Send button event listener
    sendButton.addEventListener("click", () => {
      const text = userInput.value;
      if (text.trim()) {
        addMessage("User", text);
        userInput.value = ""; // Clear the input field
  
        // TODO: send to chat model w/ transformers.js or langchain.js

        // Simulate a response from the chat system
        setTimeout(() => {
          addMessage("ChatBot", "This is a response to: " + text);
        }, 500);
      }
    });
  });
  