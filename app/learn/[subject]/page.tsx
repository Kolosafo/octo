'use client';
import InteractiveLesson from '@/app/_components/Lesson/InteractiveLesson';
import Warmup from '@/components/warmup';
import { GeneralLesson } from '@/mockups/dummyLesson';
import { handleLessonComplete } from '@/redux/lesson/lessonSlice';
import { GeneralInteractiveLessonType } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Page = ({ params }: { params: { subject: string } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [lessonObjectList, setLessonObjectList] = useState(
    GeneralLesson.lessonObj
  );
  const [loading, setLoading] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const lessonLength = lessonObjectList.length;
  const decodeSubject = decodeURIComponent(params.subject);

  const handleIsComplete = (id: string | number) => {
    const updatedLessonObjectList = lessonObjectList.map((item) =>
      item.id === id ? { ...item, isComplete: true } : item
    );
    setLessonObjectList(updatedLessonObjectList);

    if (activeLessonIndex + 1 === lessonLength) {
      setActiveLessonIndex(activeLessonIndex);
      return;
    }
    setActiveLessonIndex(activeLessonIndex + 1);
  };

  const handleToggleLesson = (id: string | number) => {
    const findItem = lessonObjectList.findIndex((lesson) => lesson.id === id);
    setActiveLessonIndex(findItem);
  };

  const submitAssessment = () => {
    dispatch(
      handleLessonComplete({
        sectionId: GeneralLesson.sectionId,
        lessonId: GeneralLesson.sectionLessonId,
      })
    );
    router.push('/learn/lessons');
  };

  console.log('LESSON LENGTH: ', lessonLength, activeLessonIndex);

  if (loading) return <Warmup />;

  return (
    <>
      <section className='relative min-h-[85vh] gradient'>
        <div className='sticky top-0 min-h-[30vh] flex flex-col items-center justify-center p-5'>
          <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
            Mathematics {/* should be dynamic */}
          </h1>
          <p className='font-semibold'>{decodeSubject}</p>
        </div>

        <div className='relative p-6 md:py-10 lg:py-20 flex flex-col gap-20 bg-white min-h-screen rounded-t-3xl'>
          <div className='flex items-center justify-center gap-8'>
            {lessonObjectList.map(
              (lessonObj: GeneralInteractiveLessonType, index: number) => (
                <button
                  type='button'
                  title={'Question' + index}
                  key={lessonObj.id}
                  className={`w-5 h-5 rounded-full border-none bg-main outline-none transition duration-300${
                    activeLessonIndex === index
                      ? 'bg-main outline-2 outline-main outline-offset-2'
                      : 'outline-transparent'
                  }`}
                  onClick={() => handleToggleLesson(lessonObj.id)}
                ></button>
              )
            )}
          </div>
          <InteractiveLesson
            handleIsComplete={handleIsComplete}
            props={lessonObjectList[activeLessonIndex]}
          />
          {lessonLength === activeLessonIndex + 1 && (
            <button
              type='button'
              onClick={submitAssessment}
              className='absolute bottom-5 right-5 bg-orange-500 px-4 rounded-md'
            >
              Finish
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
