import { PracticeObjectType } from "@/types";
import { model } from "../setup";
import { octoCrushInstruction } from "./systemInstruction";

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: octoCrushInstruction }],
    },
  ],
});

const practicePrompt = ({
  subjectsStudied,
  student,
}: {
  subjectsStudied: string[];
  student: string;
}) => {
  return `Here is an array of topics ${student} has studied:${subjectsStudied} create a practice quiz object for the student".
`;
};
export const generateQuestions = async ({
  subjectsStudied,
  student,
}: {
  subjectsStudied: string[];
  student: string;
}) => {
  const prompt = practicePrompt({ subjectsStudied, student });
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  console.log("REPONSE TEXT: ", response.text());
  const responseJson = JSON.parse(response.text());

  return responseJson as PracticeObjectType;
};
