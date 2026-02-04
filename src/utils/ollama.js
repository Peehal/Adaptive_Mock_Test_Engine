const {ChatOllama} = require("@langchain/community/chat_models/ollama");

const ollama = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "gemma2:2b",
    temperature: 0.2,
});

module.exports = ollama;

