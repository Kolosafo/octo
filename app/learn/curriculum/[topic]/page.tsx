'use client';

import React from 'react';
import LessonList from '@/app/_components/Lesson/LessonList';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';
const Curriculum = ({ params }: { params: { topic: string } }) => {
  const { curriculum } = useSelector((store: IRootState) => store.lesson);
  const decodeSubject = decodeURIComponent(params.topic);

  return (
    <section className='relative min-h-screen gradient'>
      <div className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5'>
        <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          {decodeSubject}
        </h1>
      </div>
      <div className='relative p-6 bg-mainBg min-h-[70vh]'>
        <div className='py-10 gap-8 flex flex-col max-w-screen-lg mx-auto'>
          {curriculum?.curriculum.map((item, index) => (
            <LessonList key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
