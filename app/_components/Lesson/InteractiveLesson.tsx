'use client';
import { GeneralInteractiveLessonType } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import AnswerOption from '../AnswerOption';
import { BiChevronRight } from 'react-icons/bi';

const InteractiveLesson = ({
  props,
  handleIsComplete,
}: {
  handleIsComplete: (id: number | string) => void;
  props: GeneralInteractiveLessonType;
}) => {
  const [isAnswerCurrent, setIsAnswerCorrect] = useState({
    isCorrect: false,
    feedback: '',
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const handleCheckAnswer = () => {
    if (props.answer && props.answer === selectedOption) {
      setIsAnswerCorrect({ isCorrect: true, feedback: 'Great job!' });
    } else {
      setIsAnswerCorrect({
        isCorrect: false,
        feedback: 'Oops! Your were close',
      });
      setTimeout(() => {
        setIsAnswerCorrect({
          isCorrect: false,
          feedback: '',
        });
      }, 3000);
    }
  };
  return props.type === 'lesson' ? (
    <div className='flex-col gap-6 flex py-10 px-10'>
      {props.image && (
        <div>
          <Image
            src={props.image}
            width={200}
            height={200}
            alt='image'
            className='object-contain'
          />
        </div>
      )}
      <span>{props.details}</span>
      <button
        onClick={() => handleIsComplete(props.id)}
        className='flex items-center justify-center gap-2 font-semibold text-white text-center text-light py-2 px-6 bg-main rounded-xl border-2 hover:text-main hover:bg-transparent border-main focus-visible:outline-2 focus-visible:bg-transparent focus-visible:text-main transition'
      >
        Next
        <BiChevronRight size={20} />
      </button>
    </div>
  ) : (
    <div className='flex-col gap-4 flex py-10 px-10'>
      <div className={`p-8 text-white rounded-md flex items-center justify-center bg-main ${isAnswerCurrent.feedback !== '' ? isAnswerCurrent.isCorrect ? 'bg-green-500' : 'bg-red-500' : ''}`}>
        <span className=''>{isAnswerCurrent.feedback || 'Waiting for your answer please take your time...'}</span>
      </div>
      <div className='text-lg lg:text-xl py-4 border-b'>
        <p>{props.question}</p>
      </div>
      {props.answerType === 'options' && props.options ? (
        <AnswerOption
          handleChange={handleChange}
          options={props.options}
          selectedOption={selectedOption}
          handleSubmit={handleCheckAnswer}
        />
      ) : (
        ''
      )}
      <button
        onClick={() => handleIsComplete(props.id)}
        className='flex items-center justify-center gap-2 font-semibold text-white text-center text-light py-2 px-6 bg-main rounded-xl border-2 hover:text-main hover:bg-transparent border-main focus-visible:outline-2 focus-visible:bg-transparent focus-visible:text-main transition'
        disabled={props.type === 'quiz' && !isAnswerCurrent.isCorrect}
      >
        Next
        <BiChevronRight size={20} />
      </button>
    </div>
  );
};

export default InteractiveLesson;
