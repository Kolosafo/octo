'use client';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';

function Filter({}: //   setSearchQuery,
//   searchQuery,
{
  //   setSearchQuery: Dispatch<SetStateAction<string>>;
  //   searchQuery: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [subject, setSubject] = useState<string>();

  const clearInput = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (e.target.closest('.select') === null) {
        setExpanded(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const requestSubject = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/add/subject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject }),
      });
      if (response.ok) {
        console.log('Subject added successfully');
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
    }
  };

  return (
    <div className='flex flex-col gap-6 md:gap-3 lg:flex-row md:justify-center'>
      <label
        htmlFor='search'
        className='bg-mainBg md:w-[470px] bg-alt h-fit flex items-center py-4 px-6 rounded-md shadow-sm transition duration-300'
      >
        <CiSearch size={25} aria-hidden='true' />
        <input
          id='search'
          type='text'
          autoComplete='off'
          value={searchQuery}
          placeholder='What do you want to learn...'
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
          }}
          className='w-full h-fit bg-transparent placeholder:text-sm placeholder:tracking-widest px-4 border-none outline-none transition duration-300'
        />
        {searchQuery && (
          <button
            type='button'
            title='clear input'
            onClick={() => clearInput()}
          >
            <IoClose aria-hidden='true' />
          </button>
        )}
      </label>
      <div className='select relative w-fit'>
        <button
          type='button'
          className='whitespace-nowrap bg-mainBg flex items-center gap-4 min-w-48 h-fit py-4 px-6 shadow-sm rounded-md outline-main outline-offset-1 outline-1 focus-visible:outline-dashed transition duration-300'
          onClick={() => setExpanded(!expanded)}
        >
          <MdAddCircleOutline size={25} aria-hidden='true' />
          <span className='text-sm'>Add New</span>
        </button>
        <form
          className={`px-2 bg-mainBg absolute z-10 transition-all duration-300 w-full right-0 top-[4.2rem] shadow-md rounded-md ${
            expanded
              ? 'max-h-[20rem]  py-2 opacity-100'
              : 'max-h-0 py-0 opacity-0'
          }`}
        >
          <div className='flex flex-col gap-4'>
            <label
              htmlFor='subject'
              title='request subject'
              className='p-2 bg-white rounded-md outline-main outline-offset-1 outline-1 focus-within:outline-dashed transition duration-300'
            >
              <input
                name='subject'
                placeholder='Add a subject'
                className='w-full bg-transparent placeholder:text-sm border-none outline-none'
              />
            </label>
            <button
              type='button'
              className='w-full bg-main text-mainTxt text-center px-4 py-1.5 rounded-md outline-main outline-offset-1 outline-1 focus-visible:outline-dashed transition duration-300'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
