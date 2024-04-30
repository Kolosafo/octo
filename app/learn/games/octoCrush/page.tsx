"use client";
import React, { useState, useRef, MutableRefObject } from "react";
import { BiHeart } from "react-icons/bi";
import { GameDataType, dummyOctoCrushGame } from "@/mockups/dummyOctoCrushData";
import GameDisplayObject from "@/app/_components/octoCrushGame";

export interface BalloonObject {
  id: number;
  value: string;
  ref: MutableRefObject<any>;
  movementSpeed: number; // TRHIS IS THE ANIMATION DURATION IN FRAME SO THE LOWER IT IS THE FASTER THE MOVEMENT SPEED
}
const Game = () => {
  const balloonOne = useRef<any>(null);
  const balloonTwo = useRef<any>(null);
  const balloonThree = useRef<any>(null);
  const balloonFour = useRef<any>(null);
  const dummyGameObject = dummyOctoCrushGame(
    balloonOne,
    balloonTwo,
    balloonThree,
    balloonFour
  );
  const [activeStage, setActiveStage] = useState(0);
  const [gameData, setGameData] = useState<GameDataType>(dummyGameObject);
  const [gameOver, setGameOver] = useState(false);

  const handleDecreasePoints = () => {
    setGameData((data) => ({
      ...data,
      hp: data.hp - 1,
    }));
    if (dummyGameObject.gameObj.length === activeStage + 1) {
      handleGameOver(true);
      return; // IF USER IS IN THE FINAL STAGE, END THE GAME, RETURN SINCE THEY CAN'T GO FORWARD AGAIN
    }
    setActiveStage(activeStage + 1);
  };

  const handleIncreasePoints = () => {
    setGameData((data) => ({
      ...data,
      points: data.points + 1,
      hp: data.hp + 2,
    }));
    if (dummyGameObject.gameObj.length === activeStage + 1) {
      handleGameOver(true);
      return; // IF USER IS IN THE FINAL STAGE, END THE GAME, RETURN SINCE THEY CAN'T GO FORWARD AGAIN
    }
    console.log(
      "OBJ LENGHT: ",
      dummyGameObject.gameObj.length,
      "Active Stage: ",
      activeStage
    );
    setActiveStage(activeStage + 1);
  };

  const handleGameOver = (val: boolean) => {
    setGameOver(val);
  };

  return (
    <div className="h-screen overflow-hidden p-2 px-6">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Instruction:</span>
            <span className="text-semibold">{gameData.instruction}</span>
          </div>
          <div className="flex flex-col mt-4 mr-4 gap-1">
            <div className="flex items-center gap-1">
              <BiHeart size={25} color="red" />
              <span className="text-semibold text-lg">{gameData.hp}</span>
            </div>
            <span>Score: {gameData.points}</span>
          </div>
        </div>
      </div>
      {}
      <GameDisplayObject
        hp={gameData.hp}
        question={gameData.gameObj[activeStage].question}
        answer={gameData.gameObj[activeStage].answer}
        balloons={gameData.gameObj[activeStage].balloons}
        timeout={gameData.gameObj[activeStage].timeout}
        handleDecreasePoints={handleDecreasePoints}
        handleIncreasePoints={handleIncreasePoints}
        handleGameOver={handleGameOver}
      />
      {gameOver && (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-screen w-screen bg-black/70">
          <span className="text-white text-2xl px-4 py-2 light-peach-bg">
            GAME OVER!
          </span>
          <span className="text-lg font-bold text-white">
            Score: {gameData.points}
          </span>
          <span
            onClick={() => window.location.reload()}
            className="cursor-pointer mt-4 text-base font-semibold text-neutral-200"
          >
            Play Again
          </span>
        </div>
      )}
    </div>
  );
};

export default Game;
