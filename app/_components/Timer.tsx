"use client";
import React, { useState, useEffect } from "react";

interface TimerProps {
  timerTime: number; // Time in minutes
  expiryMessage: string;
  terminate: () => void;
  pause: () => void;
  play: () => void;
}
// pass the following as props nd the timer will work
const Timer: React.FC<TimerProps> = ({
  timerTime,
  expiryMessage,
  terminate,
  pause,
  play,
}) => {
  // Convert minutes to seconds for internal use
  const [timeLeft, setTimeLeft] = useState(timerTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            clearInterval(interval);
            terminate();
            return 0;
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, terminate]);

  const handlePlay = () => {
    setIsRunning(true);
    play();
  };

  const handlePause = () => {
    setIsRunning(false);
    pause();
  };

  // Calculate minutes and seconds for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full flex flex-col justify-center items-center p-10">
      <p className=" my-4 text-3xl text-white">
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds} minutes left
      </p>
      {timeLeft <= 1 && <p>{expiryMessage}</p>}
      <div className=" flex ">
        <button className="mr-5 border p-3 rounded-xl" onClick={handlePlay}>Play</button>
        <button className="border p-3 rounded-xl" onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

export default Timer;
