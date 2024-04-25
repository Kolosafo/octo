"use client";
import { GeneralInteractiveLessonType } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import AnswerOption from "../AnswerOption";
import parse from "html-react-parser";

const InteractiveLesson = ({
  props,
  handleIsComplete,
}: {
  handleIsComplete: (id: number | string) => void;
  props: GeneralInteractiveLessonType;
}) => {
  const [isAnswerCurrent, setIsAnswerCorrect] = useState({
    isCorrect: false,
    feedback: "",
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleCheckAnswer = () => {
    if (props.answer && props.answer === selectedOption) {
      setIsAnswerCorrect({ isCorrect: true, feedback: "Great job!" });
    } else {
      setIsAnswerCorrect({
        isCorrect: false,
        feedback: "Oops! Your were close",
      });
      setTimeout(() => {
        setIsAnswerCorrect({
          isCorrect: false,
          feedback: "",
        });
      }, 3000);
    }
  };

  const clearCheckAnswer = () => {
    setIsAnswerCorrect({
      isCorrect: false,
      feedback: "",
    });
    setSelectedOption(null);
  };
  return props.type === "lesson" ? (
    <div className="flex-col flex py-10 px-10">
      {props.image && (
        <div>
          <Image
            src={props.image}
            width={200}
            height={200}
            alt="image"
            className="object-contain"
          />
        </div>
      )}
      <div>{parse(props.details)}</div>
      <button
        onClick={() => handleIsComplete(props.id)}
        className="px-4 py-2 rounded-md bg-orange-600"
      >
        Next
      </button>
    </div>
  ) : (
    <div className="flex-col flex py-10 px-10">
      <div>{parse(props.details)}</div>
      <span className="text-rose-400">{isAnswerCurrent.feedback}</span>
      <div>{parse(props.question ? props.question : "")}</div>
      {props.answerType === "options" && props.options ? (
        <AnswerOption
          handleChange={handleChange}
          options={props.options}
          selectedOption={selectedOption}
          handleSubmit={handleCheckAnswer}
        />
      ) : (
        ""
      )}
      <button
        onClick={() => {
          handleIsComplete(props.id);
          clearCheckAnswer();
        }}
        className="px-4 py-2 rounded-md bg-orange-600"
        disabled={props.type === "quiz" && !isAnswerCurrent.isCorrect}
      >
        Next
      </button>
    </div>
  );
};

export default InteractiveLesson;
