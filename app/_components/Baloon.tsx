'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';

interface BaloonProps {
  image: string;
  imageName: string;
  word: string;
  checkMatch: (word: string) => void;
  index: number;
}

function Baloon({ image, imageName, checkMatch, word, index }: BaloonProps) {
  const baloonref = React.useRef<HTMLButtonElement>(null);

  const randomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return color;
  };

  useEffect(() => {
    if (baloonref.current) {
      baloonref.current.style.animationDuration = `${index + 3}s`;
    }
  }, [index]);

  return (
    <button
      type='button'
      title='pop baloon'
      onClick={() => checkMatch(word)}
      ref={baloonref}
      className='baloon relaive'
    >
      <div
        className={`w-32 h-44 flex items-center justify-center rounded-[60%_/_50%_50%_60%_60%] bg-blue-400`}
      >
        <Image
          alt={imageName}
          src={image}
          width={20}
          height={20}
          className='w-auto h-auto'
        />
      </div>
      <div className='absolute -bottom-4 right-[53px] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-b-blue-400 border-transparent border-solid'></div>
    </button>
  );
}

export default Baloon;
