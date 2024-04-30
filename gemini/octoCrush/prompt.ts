import { model } from "../setup";
import { octoCrushInstruction } from "./systemInstruction";
import { GameDataType } from "@/mockups/dummyOctoCrushData";

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: octoCrushInstruction }],
    },
  ],
});

const octoPrompt = ({ subjectsStudied }: { subjectsStudied: string[] }) => {
  return `Here is an array of topics a student has studied:${subjectsStudied} create a game object for the student".
`;
};
export const generateOctoCruchGame = async ({
  subjectsStudied,
}: {
  subjectsStudied: string[];
}) => {
  const prompt = octoPrompt({ subjectsStudied });
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  console.log("REPONSE TEXT: ", response.text());
  const responseJson = JSON.parse(response.text());

  return responseJson as GameDataType;
};