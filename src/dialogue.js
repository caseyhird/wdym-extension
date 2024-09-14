import { sendChatMessage } from "./chat_model.js";

document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    // generate random sessionId
    const sessionId = Math.random().toString(36).substring(2, 15);

    // Add a message to the chat
    function addMessage(sender, text, isUser) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      if (isUser) {
        messageElement.classList.add("sender");
      } else {
        messageElement.classList.add("recipient");
      }
      messageElement.innerHTML = `
        <span class="name">${sender}:</span>
        <span class="text">${text}</span>
      `;
      chatContainer.appendChild(messageElement);
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    }

    // Send intial message
    chrome.storage.local.get("selectedText", async (data) => {
      if (data.selectedText) {
        const message = "What does this mean? \n\n" + data.selectedText;
        addMessage("User", message, true);
        const response = await sendChatMessage(message, sessionId);
        addMessage("ChatBot", response, false);
      }
    });
  
    // Listen for follow-up messages
    sendButton.addEventListener("click", async () => {
      const text = userInput.value;
      if (text.trim()) {
        addMessage("User", text, true);
        userInput.value = ""; // Clear the input field
  
        const response = await sendChatMessage(text, sessionId);
        addMessage("ChatBot", response, false);
      }
    });

    // Listen for "enter" click while user is in input box
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevents the default action of the Enter key
        sendButton.click();  // Simulates a click on the send button
      }
    });
  });
  