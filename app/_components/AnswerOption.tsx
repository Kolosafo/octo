"use client";
import { AnswerOptionType } from "@/types";
import React, { useState } from "react";

const AnswerOption = ({
  options,
  handleChange,
  selectedOption,
  handleSubmit,
}: {
  options: AnswerOptionType[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption: string | null;
  handleSubmit: (feedback: string) => void;
}) => {
  const [selectedOptionFeedback, setSelectedOptionFeedback] = useState("");
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      {options.map((option) => (
        <div key={option.id} className="flex gap-2">
          <input
            type="radio"
            id={option.id}
            name="option"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={(e) => {
              handleChange(e);
              setSelectedOptionFeedback(option.feedback);
            }}
          />
          <label htmlFor={option.id}>{option.value}</label>
        </div>
      ))}
      <button
        onClick={() => handleSubmit(selectedOptionFeedback)}
        type="submit"
        className="bg-main yellow-400 py-2 px-4 text-white w-fit rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default AnswerOption;
