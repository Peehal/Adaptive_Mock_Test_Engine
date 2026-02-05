import { ChatOllama } from "@langchain/ollama";

const ollama = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "gemma2:2b",
  temperature: 0.2,
});

export default ollama;
