import { BalloonObject } from "@/app/learn/games/octoCrush/page";
import { MutableRefObject } from "react";
export interface gameObjType {
  balloons: [BalloonObject, BalloonObject, BalloonObject, BalloonObject];
  question: string;
  timeout: number;
  answer: string;
}

export type GameDataType = {
  points: number;
  instruction: string;
  hp: number;
  gameObj: gameObjType[];
};

export const dummyOctoCrushGame = (
  balloonOne: MutableRefObject<any>,
  balloonTwo: MutableRefObject<any>,
  balloonThree: MutableRefObject<any>,
  balloonFour: MutableRefObject<any>
): GameDataType => {
  return {
    points: 0,
    hp: 20,
    instruction:
      "Add the below numbers and click on the balloon with the right answer",
    gameObj: [
      {
        balloons: [
          { id: 1, value: "1", ref: balloonOne, movementSpeed: 7 },
          { id: 2, value: "4", ref: balloonTwo, movementSpeed: 9 },
          { id: 3, value: "2", ref: balloonThree, movementSpeed: 6 },
          { id: 3, value: "20", ref: balloonFour, movementSpeed: 5 },
        ],

        question: "What is the result of 2+2",
        timeout: 5000,
        answer: "4",
      },
      {
        balloons: [
          { id: 1, value: "1", ref: balloonOne, movementSpeed: 7 },
          { id: 2, value: "4", ref: balloonTwo, movementSpeed: 9 },
          { id: 3, value: "2", ref: balloonThree, movementSpeed: 6 },
          { id: 3, value: "20", ref: balloonFour, movementSpeed: 5 },
        ],

        question: "What is the result of 3-2",
        timeout: 5000,
        answer: "1",
      },
      {
        balloons: [
          { id: 1, value: "11", ref: balloonOne, movementSpeed: 17 },
          { id: 2, value: "40", ref: balloonTwo, movementSpeed: 19 },
          { id: 3, value: "20", ref: balloonThree, movementSpeed: 16 },
          { id: 3, value: "0", ref: balloonFour, movementSpeed: 15 },
        ],

        question: "What is the result of 40+0",
        timeout: 5000,
        answer: "40",
      },
      {
        balloons: [
          {
            id: 1,
            value: "Weyre Ni Boboyi",
            ref: balloonOne,
            movementSpeed: 17,
          },
          {
            id: 2,
            value: "Weyre Ni Boboyi",
            ref: balloonTwo,
            movementSpeed: 9,
          },
          {
            id: 3,
            value: "Weyre Ni Boboyi",
            ref: balloonThree,
            movementSpeed: 12,
          },
          {
            id: 3,
            value: "Weyre Ni Boboyi",
            ref: balloonFour,
            movementSpeed: 15,
          },
        ],
        question: "What is the name of Nigeria president?",
        timeout: 5000,
        answer: "Weyre Ni Boboyi",
      },
    ],
  };
};
