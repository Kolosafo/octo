import Image from 'next/image';
import React from 'react';

interface BaloonProps {
  image: string;
  imageName: string;
}

function Baloon({ image, imageName }: BaloonProps) {
  const randomColor = () => {
    const color = 'red-500';
    return color;
  };

  return (
    <button
      type='button'
      title='pop baloon'
      className={`w-20 h-20 rounded-full bg-${randomColor()}`}
    >
      <Image
        alt={imageName}
        src={image}
        width={50}
        height={50}
        className='w-auto h-auto'
      />
    </button>
  );
}

export default Baloon;
