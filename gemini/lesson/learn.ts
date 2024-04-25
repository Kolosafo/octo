import { LessonObjectType } from "@/types";
import { systemInstruction } from "./learnLessonPrompt";
import { model } from "../setup";

export type lessonPromptDataType = {
  lessonToLearn: string;
  name: string;
  age: number | string;
  gradeLevel: number | string;
  schoolLevel: "high school" | "middle school";
  gender: string;
  country: string;
  currentLessonId: string | number;
  lastLessonLearnt: string;
  subject: string;
};

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: systemInstruction }],
    },
  ],
});

const lessonPrompt = (props: lessonPromptDataType) => {
  return `${props.name} is a ${props.age} years old ${props.gender} from ${props.country} in grade ${props.gradeLevel} in 
${props.schoolLevel}. Teach ${props.name} "${props.lessonToLearn}" with it's lessonId being "${props.currentLessonId}" and under the subject:
 "${props.subject}", the last lesson ${props.name} learnt was "${props.lastLessonLearnt}".
`;
};

export const generateLearnLesson = async (props: lessonPromptDataType) => {
  const prompt = lessonPrompt(props);
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const responseJson = JSON.parse(response.text());

  return responseJson as LessonObjectType;
};
