'use client';

import React, { useEffect, useState } from 'react';
import LessonList from '@/app/_components/Lesson/LessonList';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';
import Loading from '@/app/loading';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getCourseCurriculum } from '@/api/course';
import { handleGetCurriculum } from '@/redux/learn/learnSlice';
import { useRouter } from 'next/navigation';


const Curriculum = ({ params }: { params: { courseObj: string[] } }) => {
  const router = useRouter();

  const { activeCourseCurriculum, isLoading } = useSelector(
    (store: IRootState) => store.lesson
  );

  // PARAM ORDER: subject, courseId, refetchCourse
  const decodeSubject = decodeURIComponent(params.courseObj[0]);
  const courseId = parseInt(decodeURIComponent(params.courseObj[1]));
  const refetchCourse = decodeURIComponent(params.courseObj[2]);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  console.log('ACTIVE LESSON: ', activeCourseCurriculum);

  useEffect(() => {
    if (courseId) {
      dispatch(handleGetCurriculum({ courseId }));
    }
  }, [courseId, dispatch]);


  useEffect(() => {
    if (courseId && refetchCourse && refetchCourse === 'reFetch') {
      dispatch(getCourseCurriculum({ course_id: courseId }));
    }
  }, [refetchCourse, dispatch, courseId]);


  return (
    <div className='relative min-h-screen gradient'>
      <section className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5 gradient'>
        <div className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5'>
          <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
            {decodeSubject}
          </h1>
        </div>
      </section>

      <section className='relative p-6 bg-white min-h-[70vh]'>
        <div className='max-w-screen-lg mx-auto rounded-t-3xl border-black flex flex-col gap-8 z-10 p-10 bg-white min-h-full'>
          {isLoading ? (
            <Loading  />
          ) : activeCourseCurriculum && activeCourseCurriculum.length > 0 ? (
            activeCourseCurriculum.map((item, index) => (
              <LessonList
                key={index}
                {...item}
                courseId={courseId}
                courseTitle={decodeSubject}
              />
            ))
          ) : (
            <div className='flex flex-col gap-4 justify-center items-center w-full h-full'>
              <span>We couldn&apos;t find this course&apos;s curriculum</span>
              <button
                className='px-2 py-1 bg-orange-500 text-white rounded-md'
                onClick={() => router.push('/learn')}
              >
                Go Back To Courses
              </button>
            </div>
          )}
          <div className='flex items-center h-full justify-center gap-2'></div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
