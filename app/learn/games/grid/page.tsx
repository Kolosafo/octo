"use client";
import GridBox from "@/app/_components/GridBox";
import { testQuestionOne } from "@/game_utils/grid/dummyData";
import React, { useState } from "react";

const Page = () => {
  const [answerFeedback, setAnswerFeedback] = useState("");
  const handleCheckAnswer = (selectedAnswer: string) => {
    const correctAnswer = testQuestionOne.answer;
    if (correctAnswer === selectedAnswer) {
      setAnswerFeedback("Great Job!");
    } else {
      setAnswerFeedback("You were close, try again!");
      setTimeout(() => setAnswerFeedback(""), 3000);
    }
  };
  return (
    <div className="w-full py-10 px-10 flex flex-col ">
      <span>{answerFeedback}</span>
      <span>{testQuestionOne.question}</span>
      <div className="flex flex-wrap gap-5">
        {testQuestionOne.displayQuestion.boxes.map((boxItem) => (
          <GridBox
            key={boxItem.id}
            id={boxItem.id}
            index={boxItem.index}
            color={boxItem.color}
            type={boxItem.type}
            value={boxItem.value}
            image={boxItem.image}
            onClick={handleCheckAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
