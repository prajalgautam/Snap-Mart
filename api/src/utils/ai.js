import { GoogleGenAI } from "@google/genai";

import config from "../config/config.js";

let ai;

const promptAI = async (promptMessage) => {
  if (!config.geminiApiKey) {
    console.warn("GEMINI_API_KEY is not set. Skipping AI generation.");
    return "";
  }

  ai ??= new GoogleGenAI({ apiKey: config.geminiApiKey });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promptMessage,
  });

  return response.text;
};

export default promptAI;
