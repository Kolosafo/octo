import { AiInteractiveLearningResponseType } from "@/types";

export const interactiveDummyResponse: AiInteractiveLearningResponseType = {
  question: "Which one the boxes contains the number two?",
  answer: "2",
  hint: "22",
  note: "This is a basic question",
  timeout: 5000,
  displayQuestion: {
    image: [
      {
        id: "1",
        src: "/img/ice-cream.png",
        name: "ice cream",
        label: "1",
      },
      {
        id: "2",
        src: "/img/pizza.webp",
        name: "pizza",
        label: "2",
      },
    ],
    aiText:
      "The First image on the screen is an ice cream that looks like letter 1.",
    studentResponse: null,
  },
};
