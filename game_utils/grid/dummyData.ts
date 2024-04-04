import { AiGridResponseType } from "@/types";

export const testQuestionOne: AiGridResponseType = {
  question: "Which one the boxes contains the number two?",
  answer: "2",
  hint: "22",
  note: "This is a basic question",
  timeout: 5000,
  displayQuestion: {
    draggable: false,
    length: 6,
    boxes: [
      {
        id: "1",
        value: "1",
        color: "red",
        index: 1,
        type: "text",
      },
      {
        id: "2",
        value: "2",
        color: "green",
        index: 2,
        type: "text",
      },
      {
        id: "3",
        value: "3",
        color: "blue",
        index: 3,
        type: "text",
      },
      {
        id: "4",
        value: "Triangle",
        color: "red",
        index: 1,
        type: "image",
      },
      {
        id: "5",
        value: "Circle",
        color: "green",
        index: 2,
        type: "image",
      },
      {
        id: "6",
        value: "Square",
        color: "blue",
        index: 3,
        type: "image",
      },
    ],
  },
};
