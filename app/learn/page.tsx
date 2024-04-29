'use client';
import React, { useEffect } from 'react';
import TopicCard from '../_components/TopicCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';
import {
  calculateCourseCompletion,
  curriculumCompletionPercentage,
} from '@/helpers/helper';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getCourses } from '@/api/course';
import Loading from '../loading';
import Link from 'next/link';


import { FiPlusCircle } from 'react-icons/fi';

const Page = ({ params }: { params?: { newCourse: string } }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const { courses, isLoading, combinedCourseAndCurriculumObject } = useSelector(
    (store: IRootState) => store.lesson
  );
  const { isLogged, authLoading } = useSelector(
    (store: IRootState) => store.user
  );

  console.log('NEW COURSE: ', params);

  useEffect(() => {
    isLogged ? dispatch(getCourses()) : null;
  }, [dispatch, isLogged]);

  return (
    <div className='relative min-h-screen gradient'>
      <section className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5 gradient'>
        <div className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5'>
          <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
            Ready to learn?
          </h1>
        </div>
      </section>

      <section className='relative p-6 bg-white min-h-[70vh]'>
        {!isLogged ? (
          <div className='flex w-full min-h-[50vh] justify-center items-center'>
            <p className='max-w-screen-sm mx-auto text-center text-lg'>
              Hi there, you need to be signed in for a personalized
              experience. please use the &quot;login&quot; button on the sidebar to
              continue.
            </p>
          </div>
        ) : isLoading || authLoading ? (
          <Loading />
        ) : (
          <div className='max-w-screen-md mx-auto flex flex-col gap-8 bg-white min-h-full'>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-main text-white font-semibold rounded-md self-end'
              onClick={() => {
                !isLogged
                  ? router.push('/auth/login')
                  : router.push('/new-course');
              }}
            >
              <FiPlusCircle size={20} />
              <span>
              New
              </span>
            </button>
            {!courses || courses.length === 0 ? (
              <div className='flex flex-col gap-4 items-center'>
                <span>You haven&lsquo;t started learning any topics yet</span>
                <button
                  className='violet-bg text-white px-4 py-2 rounded-md'
                  onClick={() => {
                    !isLogged
                      ? router.push('/auth/login')
                      : router.push('/new-course');
                  }}
                >
                  Start Learning
                </button>
              </div>
            ) : (
              courses.map((course) => (
                <TopicCard
                  key={course.id}
                  subject={course.subject}
                  courseId={course.id}
                  numOfLessons={course.curriculum?.length ?? 0}
                  progressPercentage={calculateCourseCompletion(
                    course.id,
                    combinedCourseAndCurriculumObject
                  )}
                />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
