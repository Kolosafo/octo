'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const SubjectSearchSelect = ({
  subjects,
  handleCreateCourses,
}: {
  subjects: string[];
  handleCreateCourses: (subject: string) => void;
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showSubjects, setShowSubjects] = useState(subjects);
  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setShowSubjects(
      subjects.filter((subject) =>
        subject.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
    console.log('Checking endless loop...');
  }, [searchValue, subjects]);
  return (
    <div className='max-w-screen-md mx-auto flex flex-col gap-8 justify-center mt-10'>
      {/* search input */}
      <label
        htmlFor='search'
        className='bg-mainBg bg-alt h-fit flex items-center py-4 px-6 rounded-md shadow-sm transition duration-300'
      >
        <CiSearch size={25} aria-hidden='true' />
        <input
          id='search'
          type='text'
          autoComplete='off'
          value={searchValue}
          placeholder='Search a topic...'
          onChange={handleInputChange}
          className='w-full h-fit bg-transparent placeholder:text-sm placeholder:tracking-widest px-4 border-none outline-none transition duration-300'
        />
        {searchValue && (
          <button
            type='button'
            title='clear input'
            onClick={() => setSearchValue('')}
          >
            <IoClose aria-hidden='true' />
          </button>
        )}
      </label>

      {/* dropdown list */}
      <div
        id='dropdown-menu'
        className='relative border max-h-[20rem] overflow-y-scroll right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1'
      >
        {/* <!-- Dropdown content goes here --> */}
        {showSubjects.length > 0 ? (
          showSubjects.map((subject, index) => (
            <span
              key={index}
              className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </span>
          ))
        ) : (
          <span
            onClick={() => setSelectedSubject(searchValue)}
            className='block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
          >
            {searchValue}
          </span>
        )}
      </div>
      {selectedSubject && (
        <button
          onClick={() => handleCreateCourses(selectedSubject)}
          disabled={!selectedSubject ? true : false}
          className='p-1 bg-orange-500 px-4 rounded-md text-white font-bold hover:bg-orange-600 transition-all delay-100'
        >
          Proceed to learning {selectedSubject}
        </button>
      )}
    </div>
  );
};

export default SubjectSearchSelect;
