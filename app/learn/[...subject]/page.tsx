'use client';
import InteractiveLesson from '@/app/_components/Lesson/InteractiveLesson';
import Loading from '@/app/_components/Loading';
import Loader from '@/components/loader';
import { generateLearnLesson } from '@/gemini/lesson/learn';
import { GeneralLesson } from '@/mockups/dummyLesson';
import { handleLessonComplete } from '@/redux/lesson/lessonSlice';
import { GeneralInteractiveLessonType, LessonObjectType } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const Page = ({ params }: { params: { subject: string[] } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fullLessonObject, setFullLessonObject] =
    useState<LessonObjectType | null>(null);
  const [lessonObjectList, setLessonObjectList] = useState<
    GeneralInteractiveLessonType[] | null
  >(null);
  const [lessonLength, setLessonLength] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const decodeLessonToLearn = decodeURIComponent(params.subject[0]);
  const decodeSubject = decodeURIComponent(params.subject[1]);
  console.log('SUBJECT TO LEARN: ', decodeSubject);
  const decodeLastLessonLearnt = decodeURIComponent(params.subject[2]);

  const handleIsComplete = (id: string | number) => {
    const updatedLessonObjectList = lessonObjectList?.map((item) =>
      item.id === id ? { ...item, isComplete: true } : item
    );
    if (updatedLessonObjectList) {
      setLessonObjectList(updatedLessonObjectList);
    }

    if (activeLessonIndex + 1 === lessonLength) {
      setActiveLessonIndex(activeLessonIndex);
      return;
    }
    setActiveLessonIndex(activeLessonIndex + 1);
  };

  const handleToggleLesson = (id: string | number) => {
    const findItem = lessonObjectList?.findIndex((lesson) => lesson.id === id);
    if (findItem !== undefined) {
      setActiveLessonIndex(findItem);
    }
  };

  // console.log("LESSON LENGTH: ", lessonLength, activeLessonIndex);
  useEffect(() => {
    console.log('LOADING...');
    (async () => {
      setIsLoading(true);
      const response = await generateLearnLesson({
        lessonToLearn: decodeLessonToLearn,
        name: 'Kirin',
        age: 11,
        gradeLevel: 5,
        schoolLevel: 'middle school',
        gender: 'male',
        country: 'Nigeria',
        currentLessonId: 4,
        lastLessonLearnt: decodeLastLessonLearnt,
        subject: decodeSubject,
      });
      console.log('DONE LOADING...', response);
      setLessonObjectList(response.lessonDetails);
      setIsLoading(false);
      setFullLessonObject(response);
    })();
  }, [decodeLessonToLearn, decodeSubject, decodeLastLessonLearnt]);

  useEffect(() => {
    if (lessonObjectList) {
      setLessonLength(lessonObjectList.length);
    }
  }, [lessonObjectList]);

  const submitAssessment = () => {
    dispatch(
      handleLessonComplete({
        lessonId: fullLessonObject?.lessonId,
      })
    );
    router.push(`/learn/curriculum/${GeneralLesson.subject}`);
  };

  return (
    <section className='relative min-h-[85vh] gradient'>
      <div className='sticky top-0 min-h-[30vh] flex flex-col items-center justify-center p-5'>
        <h1 className='capitalize text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          {decodeLessonToLearn}
        </h1>
        <p className='font-semibold'>{decodeSubject}</p>
      </div>

      <div className='relative p-6 md:py-10 lg:py-16 bg-white min-h-screen'>
        {isLoading || !lessonObjectList ? (
          <Loader
            label={`Professor Octo is generating your "${decodeLessonToLearn}" lessons`}
          />
        ) : (
          <div className='max-w-screen-md mx-auto'>
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
                onClick={() => submitAssessment()}
                className='mx-auto font-semibold text-white text-center text-light py-2 px-6 bg-main rounded-xl border-2 hover:text-main hover:bg-transparent border-main focus-visible:outline-2 focus-visible:bg-transparent focus-visible:text-main transition'
              >
                Finish
              </button>
            )}
          </div>
        )}
      </div>
    </section>

    // <div className='relative py-10 px-5'>
    //   <span> {decodeLessonToLearn}</span>

    //     <>
    //       {' '}
    //       <div className='max-w-screen-md mx-auto'>
    //         <div className='flex items-center justify-center gap-8'>
    //           {lessonObjectList.map(
    //             (lessonObj: GeneralInteractiveLessonType, index: number) => (
    //               <button
    //                 type='button'
    //                 title={'Question' + index}
    //                 key={lessonObj.id}
    //                 className={`w-5 h-5 rounded-full border-none bg-main outline-none transition duration-300${
    //                   activeLessonIndex === index
    //                     ? 'bg-main outline-2 outline-main outline-offset-2'
    //                     : 'outline-transparent'
    //                 }`}
    //                 onClick={() => handleToggleLesson(lessonObj.id)}
    //               ></button>
    //             )
    //           )}
    //         </div>
    //         <InteractiveLesson
    //           handleIsComplete={handleIsComplete}
    //           props={lessonObjectList[activeLessonIndex]}
    //         />
    //       </div>
    //       {lessonLength === activeLessonIndex + 1 && (
    //         <button
    //           type='button'
    //           onClick={() => submitAssessment()}
    //           className='mx-auto font-semibold text-white text-center text-light py-2 px-6 bg-main rounded-xl border-2 hover:text-main hover:bg-transparent border-main focus-visible:outline-2 focus-visible:bg-transparent focus-visible:text-main transition'
    //         >
    //           Finish
    //         </button>
    //       )}
    //     </>
    //   )}
    // </div>
  );
};

export default Page;
