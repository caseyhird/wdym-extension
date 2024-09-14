import { sendChatMessage } from "./chat_model.js";

document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    // generate random sessionId
    const sessionId = Math.random().toString(36).substring(2, 15);
  
    // Add a message to the chat
    function addMessage(sender, text) {
      const messageElement = document.createElement("div");
      messageElement.textContent = `${sender}: ${text}`;
      chatContainer.appendChild(messageElement);
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }

    // Send intial message
    chrome.storage.local.get("selectedText", async (data) => {
      if (data.selectedText) {
        const message = "What does this mean? \n\n" + data.selectedText;
        addMessage("User", message);
        const response = await sendChatMessage(message, sessionId);
        addMessage("ChatBot", response);
      }
    });
  
    // Listen for follow-up messages
    sendButton.addEventListener("click", async () => {
      const text = userInput.value;
      if (text.trim()) {
        addMessage("User", text);
        userInput.value = ""; // Clear the input field
  
        const response = await sendChatMessage(text, sessionId);
        addMessage("ChatBot", response);
      }
    });
  });
  