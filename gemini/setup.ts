// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { systemInstruction } from "./lesson/learnLessonPrompt";

export const APIKEY = process.env.NEXT_PUBLIC_API_KEY || "";
const genAI = new GoogleGenerativeAI(APIKEY);

// ...
const generation_config = {
  temperature: 0.2,
  top_p: 0.95,
  top_k: 0,
  max_output_tokens: 9000,
  response_mime_type: "application/json",
};

const safety_settings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  generationConfig: generation_config,
  safetySettings: safety_settings,
});
