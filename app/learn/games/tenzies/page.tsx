'use client';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Die from '@/app/_components/Die';
import { nanoid } from 'nanoid';

interface Die {
  value: number;
  held: boolean;
  id: string;
}

export default function Tenzies() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const firstValue = dice[0].value;
    // .every() checks for a specific condition, and if every item 
    // in the array is true to the condition it will return true
    const allHeld = dice.every((die: Die) => die.held);
    const allSameNumber = dice.every((die: Die) => die.value === firstValue);
    if (allHeld && allSameNumber) {
      setTenzies(true);
    }
  }, [dice]);

  function randomDieValue() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomDieValue(),
        held: false,
        id: nanoid(),
      };
      newArray.push(newDie);
    }
    return newArray;
  }

  function rollUnheldDice() {
    if (!tenzies) {
      setDice((oldDice: Die[]) =>
        oldDice.map((die) =>
          die.held
            ? die
            : { value: randomDieValue(), held: false, id: nanoid() }
        )
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id: string) {
    setDice((prevDice: Die[]) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, held: !die.held } : die;
      })
    );
  }

  const diceElements = dice.map((die: Die) => (
    <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
  ));

  return (
    <div className='grid place-content-center text-center w-full min-h-screen font-bold p-5'>
      <div className='min-h-[31.25rem] max-w-[31.25rem] bg-white p-4 mx-auto rounded-md flex flex-col gap-4 justify-evenly items-center'>
        {tenzies && <Confetti />}
        <h1 className='text-4xl m-0 text-[#342d58]'>Tenzies</h1>
        <p className='text-[#4A4E74] px-14'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className='max-w-[350px] mx-auto grid gap-5 mb-5 grid-cols-[repeat(auto-fit,_minmax(3.125rem,_1fr))]'>
          {diceElements}
        </div>
        <button
          type='button'
          className='roll-dice min-w-[100px] p-3 font-semibold text-sm tracking-widest rounded-md bg-[#5035FF] text-white focus-visible:outline-dashed outline-offset-2 focus-visible:outline-1 focus-visible:outline-[#5035FF]'
          onClick={rollUnheldDice}
        >
          {tenzies ? 'Reset Game' : 'Roll'}
        </button>
      </div>
    </div>
  );
}
