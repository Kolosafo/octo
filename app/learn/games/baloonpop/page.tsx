"use client";
import Baloon from "@/app/_components/Baloon";
import React, { useState } from "react";
import Confetti from "react-confetti";

function Page() {
  const [playerWon, setPlayerWon] = useState(false);
  const [generatedWord, setGeneratedWord] = useState("some ai generated word");

  const checkMatch = (word: string) => {
    if (word === generatedWord) {
      setPlayerWon(true);
    }
  };
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#342d58]">
      {playerWon && <Confetti />}
      <div className="p-6 flex flex-col gap-4 items-center">
        <h1 className="text-4xl m-0 text-[#342d58] font-medium">
          Instructions
        </h1>
        {/* timer here maybe */}
        <p className="text-2xl">Your word is &apos;Box&apos;</p>
      </div>
      <div className="h-full border-t">
        <ul className="p-6 flex justify-evenly items-start min-h-[80vh] overflow-y-hidden">
          {new Array(4).fill(null).map((_, index) => (
            <Baloon
              key={index}
              index={index}
              value="Ballon"
              image=""
              imageName="baloon"
              word="some ai generated word"
              checkMatch={checkMatch}
            />
          ))}
          {/* on click we'LL filter and REMOVE the clicked baloon */}
        </ul>
      </div>
    </div>
  );
}

export default Page;
