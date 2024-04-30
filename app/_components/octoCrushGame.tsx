"use client";
import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import Baloon from "@/app/_components/Baloon";
import { motion } from "framer-motion";
import { findSlowestBalloon } from "@/helpers/helper";

export interface BalloonObject {
  id: number;
  value: string;
  ref: MutableRefObject<any>;
  movementSpeed: number; // TRHIS IS THE ANIMATION DURATION IN FRAME SO THE LOWER IT IS THE FASTER THE MOVEMENT SPEED
}

interface Props {
  hp: number;
  question: string;
  balloons: [BalloonObject, BalloonObject, BalloonObject, BalloonObject];
  timeout: number;
  answer: string;
  handleIncreasePoints: () => void;
  handleDecreasePoints: () => void;
  handleGameOver: (val: boolean) => void;
}
const GameDisplayObject = ({
  hp,
  balloons,
  answer,
  question,
  handleIncreasePoints,
  handleDecreasePoints,
  handleGameOver,
}: Props) => {
  const balloonOne = useRef<any>(null);
  const balloonTwo = useRef<any>(null);
  const balloonThree = useRef<any>(null);
  const balloonFour = useRef<any>(null);
  const [showObject, setShowObject] = useState({
    objectOne: true,
    objectTwo: true,
    objectThree: true,
    objectFour: true,
  });
  const [screenHeight, setScreenHeight] = useState(screen.height);
  const [answerFeedBack, setAnswerFeedBack] = useState({
    isCorrect: false,
    feedback: "",
  });

  const handleGiveFeedback = (isCorrect: boolean, feedback: string) => {
    setAnswerFeedBack({ isCorrect, feedback });
    setTimeout(() => {
      setAnswerFeedBack({ isCorrect: false, feedback: "" });
    }, 3000);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      // WE NEED TO FIND THE SLOWEST BALLOON AND USE IT DISAPPEARANCE TO TRIGGER ANOTHER ENTRY FROM THE TOP
      const slowestBalloon: any = findSlowestBalloon(balloons).ref;
      switch (slowestBalloon) {
        case "balloonOne":
          if (
            balloonOne.current.getBoundingClientRect().top >=
            screenHeight - 70
          ) {
            // THE VALUE ALWAYS SEEMS TO EXCEED THE ACTUAL SCREEN HEIGHT, I AM MINUSING TO REDUCE THE TIME IT TAKES TO COME BACK FROM THE TOP
            // LIKE THIS WE DONT HAVE TO CHECK EACH BALLOON POSITION TO RESURFACE THEM, ASPA SAY ONCE THE SLOWEST BALLOON DISAPPEARS EVERYONE
            //SHOULD ENTER BACK
            setShowObject((obj) => ({
              ...obj,
              objectOne: false,
            }));
            handleDecreasePoints();
          }
          break;
        case "balloonTwo":
          if (
            balloonTwo.current.getBoundingClientRect().top >=
            screenHeight - 70
          ) {
            // THE VALUE ALWAYS SEEMS TO EXCEED THE ACTUAL SCREEN HEIGHT, I AM MINUSING TO REDUCE THE TIME IT TAKES TO COME BACK FROM THE TOP
            // LIKE THIS WE DONT HAVE TO CHECK EACH BALLOON POSITION TO RESURFACE THEM, ASPA SAY ONCE THE SLOWEST BALLOON DISAPPEARS EVERYONE
            //SHOULD ENTER BACK
            setShowObject((obj) => ({
              ...obj,
              objectOne: false,
            }));
            handleDecreasePoints();
          }
          break;
        case "balloonThree":
          if (
            balloonThree.current.getBoundingClientRect().top >=
            screenHeight - 70
          ) {
            // THE VALUE ALWAYS SEEMS TO EXCEED THE ACTUAL SCREEN HEIGHT, I AM MINUSING TO REDUCE THE TIME IT TAKES TO COME BACK FROM THE TOP
            // LIKE THIS WE DONT HAVE TO CHECK EACH BALLOON POSITION TO RESURFACE THEM, ASPA SAY ONCE THE SLOWEST BALLOON DISAPPEARS EVERYONE
            //SHOULD ENTER BACK
            setShowObject((obj) => ({
              ...obj,
              objectOne: false,
            }));
            handleDecreasePoints();
          }
          break;
        case "balloonFour":
          if (
            balloonFour.current.getBoundingClientRect().top >=
            screenHeight - 70
          ) {
            // THE VALUE ALWAYS SEEMS TO EXCEED THE ACTUAL SCREEN HEIGHT, I AM MINUSING TO REDUCE THE TIME IT TAKES TO COME BACK FROM THE TOP
            // LIKE THIS WE DONT HAVE TO CHECK EACH BALLOON POSITION TO RESURFACE THEM, ASPA SAY ONCE THE SLOWEST BALLOON DISAPPEARS EVERYONE
            //SHOULD ENTER BACK
            setShowObject((obj) => ({
              ...obj,
              objectOne: false,
            }));
            handleDecreasePoints();
          }
          break;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [screenHeight, balloons, handleDecreasePoints]);
  useEffect(() => {
    if (!showObject.objectOne) {
      setShowObject((obj) => ({
        ...obj,
        objectOne: true,
      }));
    }
  }, [showObject]);
  useEffect(() => {
    hp < 0 ? handleGameOver(true) : null;
  }, [hp, handleGameOver]);

  const handleCheckAnswerCorrect = (selectedOption: string) => {
    if (selectedOption === answer) {
      handleGiveFeedback(true, `Correct!`);
      handleIncreasePoints();
    } else {
      handleGiveFeedback(false, `Oops! it was ${answer}`);
      handleDecreasePoints();
    }
    setShowObject((obj) => ({
      ...obj,
      objectOne: false,
    }));
  };

  return (
    <div className="h-screen overflow-hidden p-2 px-6">
      <div className="w-full my-3 flex flex-col items-center justify-center">
        <span className="text-semibold text-2xl">{question}</span>

        {answerFeedBack.feedback !== "" ? (
          <span
            className={`${
              !answerFeedBack.isCorrect ? "bg-red-600" : "bg-green-600"
            } p-3 rounded-md text-white font-bold`}
          >
            {answerFeedBack.feedback}
          </span>
        ) : (
          ""
        )}
      </div>
      {showObject.objectOne && (
        <div className="flex relative h-full w-full justify-around overflow-hidden">
          {balloons.map((balloon, index) => (
            <motion.div
              key={balloon.id}
              ref={
                index === 0
                  ? balloonOne
                  : index === 1
                  ? balloonTwo
                  : index === 2
                  ? balloonThree
                  : balloonFour
              }
              transition={{
                duration: balloon.movementSpeed,
                delay: 0,
              }}
              initial={{ y: -200 }}
              animate={{
                y: screenHeight,
                opacity: 1,
              }}
              onClick={() => {
                handleCheckAnswerCorrect(balloon.value);
              }}
              className="cursor-pointer justify-center items-center w-fit h-fit"
            >
              <Baloon value={balloon.value} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameDisplayObject;
