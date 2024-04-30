"use client";
import React, { useState, useEffect, MutableRefObject } from "react";
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
  const [showObject, setShowObject] = useState({
    objectOne: true,
    objectTwo: true,
    objectThree: true,
    objectFour: true,
  });
  const [screenHeight, setScreenHeight] = useState(screen.height);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // WE NEED TO FIND THE SLOWEST BALLOON AND USE IT DISAPPEARANCE TO TRIGGER ANOTHER ENTRY FROM THE TOP
      const slowesBalloon = findSlowestBalloon(balloons);

      if (
        slowesBalloon.ref.current.getBoundingClientRect().top >=
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
      handleIncreasePoints();
    }
    setShowObject((obj) => ({
      ...obj,
      objectOne: false,
    }));
  };

  return (
    <div className="h-screen overflow-hidden p-2 px-6">
      <div className="w-full my-3 flex items-center justify-center">
        <span className="text-semibold text-2xl">{question}</span>
      </div>
      {showObject.objectOne && (
        <div className="flex relative h-full w-full justify-around overflow-hidden">
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              ref={balloon.ref}
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
