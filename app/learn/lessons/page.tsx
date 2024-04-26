'use client';
import { GeneralCurriculum } from '@/mockups/generalCurriculum';

import React from 'react';
import LessonList from '@/app/_components/Lesson/LessonList';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';
const Curriculum = () => {
  const { curriculum } = useSelector((store: IRootState) => store.lesson);

  return (
    <div className='p-10 min-h-screen'>
      <section className='max-w-screen-lg mx-auto transition-all'>
        <div className='pb-4 border-b mb-4'>
          <h1 className='text-2xl lg:text-4xl font-semibold'>Ongoing</h1>
        </div>

        <span className='text-2xl'>{GeneralCurriculum.subject}</span>
        <div className='py-10 gap-8 flex flex-col '>
          {curriculum?.curriculum.map((item, index) => (
            <LessonList key={index} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
