'use client';
import React, { useState } from 'react';
import SubjectSearchSelect from '../../_components/subjectSearchSelect';
import { SUBJECTS_LIST } from '@/mockups/subjects';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, createQuickLearn } from '@/api/course';
import { useRouter, useSearchParams } from 'next/navigation';
import { IRootState } from '@/redux/store';
import { QuickLearnType } from '@/types';
import Loader from '@/components/loader';

const Page = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const searchParams = useSearchParams();
  const { isLoading } = useSelector((store: IRootState) => store.lesson);
  const [errorMsg, setError] = useState('');
  const router = useRouter();
  const checkQuickLearn = searchParams.get('quickLearn');

  const handleCreateCourses = (selectedSubject: string) => {
    setError('');
    if (!checkQuickLearn || checkQuickLearn !== 'true') {
      dispatch(createCourse({ subject: selectedSubject }))
        .then(({ payload }) => {
          if (payload === 'You have already started learning this course') {
            setError(payload);
            return;
          }
          router.push(`/learn/curriculum/new/${payload.subject}/${payload.id}`); // COURSE SUBJECT AND ID must be passed
          console.log('CHECKING PAYLOAD: ', payload);
        })
        .catch((e) => {
          console.log('CHECKING ERROR: ', e);
          setError('Login Required!');
          router.push(`/auth/login`);
        });
    } else {
      dispatch(createQuickLearn({ subject: selectedSubject })).then(
        ({ payload }) => {
          const payloadData: QuickLearnType = payload;
          router.push(
            `/learn/quick-learn?subject=${payloadData.subject}&subjectId=${payloadData.id}&isComplete=notComplete`
          ); // COURSE SUBJECT AND ID must be passed
        }
      );
    }
  };
  
  return (
    <div className='relative min-h-screen gradient'>
      <div className='sticky top-0 min-h-[30vh] flex items-center justify-center'>
        <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          Select a subject
        </h1>
      </div>

      <div className='relative p-6 bg-white min-h-[70vh]'>
        {isLoading ? (
          <Loader label='Loading...' />
        ) : (
          <SubjectSearchSelect
            subjects={SUBJECTS_LIST}
            handleCreateCourses={handleCreateCourses}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
