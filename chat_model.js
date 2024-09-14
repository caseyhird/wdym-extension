import { ChatGroq } from "@langchain/groq";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

const model = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY
  });

  // TODO: move to typescript
  // const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
  const messageHistories = {};

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant for helping users understand the content of the web page they are viewing.`,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);

const modelWithMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

export async function sendChatMessage(message, sessionId) {
    const response = modelWithMessageHistory.invoke({ 
      input: message, 
      chat_history: messageHistories[sessionId]
    }, {
      "configurable": {"sessionId":sessionId}
    });
    // messageHistories[sessionId].addMessages([response]);
    console.log(response);
    return (await response).content;
}