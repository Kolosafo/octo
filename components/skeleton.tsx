import React from 'react';

interface SkeletonProps {
  type: string;
}

function Skeleton(props: SkeletonProps) {
  if (props.type === 'profile') {
    return (
      <li className='py-2 px-4 rounded-lg flex gap-4 items-center w-full bg-cardBg min-h-[56px] overflow-hidden transition duration-300'>
        <div className='skeleton min-w-[30px] min-h-[30px] rounded-xl'></div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='skeleton w-2/4 h-2.5 rounded-lg'></div>
          <div className='skeleton w-1/4 h-1.5 rounded-lg'></div>
        </div>
      </li>
    );
  } else if (props.type === 'card') {
    return (
      <li className='flex flex-col gap-4 min-w-[200px] bg-cardBg rounded-xl p-3 overflow-hidden transition duration-300'>
        <div className='skeleton rounded-lg min-w-[180px] min-h-[120px]'></div>
        <div className='flex flex-col gap-2'>
          <div className='skeleton w-3/4 h-3 rounded-lg'></div>
          <div className='skeleton w-1/2 h-2 rounded-lg'></div>
        </div>
      </li>
    );
  }
}

export default Skeleton;
