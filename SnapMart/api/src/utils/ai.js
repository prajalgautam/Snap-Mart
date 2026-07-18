import { GoogleGenAI } from "@google/genai";

import config from "../config/config.js";

const promptAI = async (promptMessage) => {
  if (!config.geminiApiKey) {
    throw new Error("Gemini is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });
  const response = await ai.models.generateContent({
    model: config.geminiModel,
    contents: promptMessage,
  });

  return response.text;
};

export default promptAI;
