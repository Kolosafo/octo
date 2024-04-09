import { DragandDropType } from "@/types";

export const dummyDragdDrop: DragandDropType = {
  instruction: "Drag and drop the image that matches the shape in the box",
  length: 3,
  id: "easy-drag",
  draggableItems: [
    {
      name: "apple",
      src: "/img/apple.png",
    },
    {
      name: "slice of pizza",
      src: "/img/pizza.webp",
    },
    {
      name: "box",
      src: "/img/box.png",
    },
  ],
  droppableItems: [
    {
      id: 1,
      label: "square",
      answer: "box",
      insertedAnswer: "",
      answerImg: "",
      feedback: "A",
    },
    {
      id: 2,
      label: "triangle",
      answer: "slice of pizza",
      insertedAnswer: "",
      answerImg: "",
      feedback: "B",
    },
    {
      id: 3,
      label: "circle",
      answer: "apple",
      insertedAnswer: "",
      answerImg: "",
      feedback: "C",
    },
  ],
};
