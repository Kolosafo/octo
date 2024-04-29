import React from 'react';

interface SkeletonProps {
  type: string;
}

function Skeleton(props: SkeletonProps) {
  if (props.type === 'profile') {
    return (
      <li className='border-t pt-2 flex gap-2 items-center w-full min-h-[56px] overflow-hidden transition duration-300'>
        <div className='skeleton w-10 h-10 rounded-md'></div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='skeleton w-2/4 h-2.5 rounded-md'></div>
          <div className='skeleton w-1/4 h-1.5 rounded-md'></div>
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
