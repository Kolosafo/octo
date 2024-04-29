import { LessonObjectType, QuickLearnType } from "@/types";
import { model } from "../setup";
import { quickLearnInstruction } from "./sytemInstruction";

export type lessonPromptDataType = {
  name: string;
  age: number | string;
  gradeLevel: number | string;
  schoolLevel: "high school" | "middle school";
  gender: string;
  country: string;
  subject: string;
};

export type iDontUnderstandPromptType = {
  reason: string;
  name: string;
  lastResponse: string;
};

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: quickLearnInstruction }],
    },
  ],
});

const lessonPrompt = (props: lessonPromptDataType) => {
  return `${props.name} is a ${props.age} years old ${props.gender} from ${props.country} in grade ${props.gradeLevel} in 
${props.schoolLevel}. Quickly Teach ${props.name} "${props.subject}".
`;
};
export const generateQuickLesson = async (props: lessonPromptDataType) => {
  const prompt = lessonPrompt(props);
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  console.log("REPONSE TEXT: ", response.text());
  const responseJson = JSON.parse(response.text());

  return responseJson as QuickLearnType;
};

const iDontUnderstandPrompt = (props: iDontUnderstandPromptType) => {
  return `${props.name} says they don't understand the lessons from your last response and the reason they gave was: ${props.reason}.
   For context here is your last response: ${props.lastResponse}
  Based on ${props.name}'s reason, generate another lesson object following EXACTLY the same format as the previous resoponse but this 
  time make the lesson more understandable based on the user's feedback.
  `;
};

export const reGenerateNewQuickLesson = async (
  props: iDontUnderstandPromptType
) => {
  const prompt = iDontUnderstandPrompt(props);
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const responseJson = JSON.parse(response.text());

  return responseJson as QuickLearnType;
};
