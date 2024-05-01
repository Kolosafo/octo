import React from 'react';

interface SkeletonProps {
  type: string;
}

function Skeleton(props: SkeletonProps) {
  if (props.type === 'profile') {
    return (
      <div aria-busy='true' className='border-t pt-2 flex gap-2 items-center w-full min-h-[56px] overflow-hidden transition duration-300'>
        <div className='skeleton min-w-10 h-10 rounded-md'></div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='skeleton w-full h-2.5 rounded-md'></div>
          <div className='skeleton w-1/2 h-1.5 rounded-md'></div>
        </div>
      </div>
    );
  } else if (props.type === 'lesson') {
    return (
      <div aria-busy='true' className='flex flex-col gap-4 w-full h-full p-3 overflow-hidden transition duration-300'>
        <div className='skeleton rounded-sm h-10 w-1/3'></div>
        <div className='flex flex-col gap-4'>
          <div className='skeleton w-3/4 h-4 rounded-sm'></div>
          <div className='skeleton w-3/4 h-5 rounded-sm'></div>
          <div className='skeleton w-1/2 h-5 rounded-sm'></div>
          <div className='skeleton w-1/2 h-4 rounded-sm'></div>
          <div className='skeleton w-full h-4 rounded-sm'></div>
          <div className='skeleton w-3/4 h-5 rounded-sm'></div>
          <div className='skeleton w-3/4 h-5 rounded-sm'></div>
          <div className='skeleton w-1/3 h-5 rounded-sm'></div>
          <div className='skeleton w-2/3 h-5 rounded-sm'></div>
        </div>
      </div>
    );
  }
}

export default Skeleton;
