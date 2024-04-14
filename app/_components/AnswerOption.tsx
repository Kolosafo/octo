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
  handleSubmit: () => void;
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {options.map((option) => (
        <div key={option.id}>
          <input
            type="radio"
            id={option.id}
            name="option"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
          />
          <label htmlFor={option.id}>{option.value}</label>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        type="submit"
        className="bg-yellow-400 px-6 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default AnswerOption;
