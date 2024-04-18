'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import octo from '../../public/octo.svg';

const Page = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(false);
  const [age, setAge] = useState(false);
  const [grade, setGrade] = useState(false);
  const [favSubject, setFavSubject] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    grade: '',
    favSubject: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  };

  const runKyc = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='min-h-[85vh] bg-main'>
      <div className='min-h-[30vh] flex items-center justify-center gap-2 p-5'>
        <h1 className='text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          I&apos;m <span className='text-accent'>Octo</span> and you are?
        </h1>
        <Image src={octo} alt='' width={200} height={200} />
      </div>
      <div className='z-10 py-6 lg:px-24 bg-accent min-h-screen rounded-t-3xl lg:rounded-t-[5rem]'>
        <div className='w-full max-w-[500px] mx-auto p-10 flex flex-col gap-4 z-10 relative'>
          <form className='relative flex flex-col gap-6' onSubmit={runKyc}>
            {error && (
              <span className='text-rose-600 font-semibold'>{error}</span>
            )}
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='name'
                className='block text-altTxt text-sm md:text-base font-medium'
              >
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                autoComplete='off'
                onChange={(e) => handleChange(e)}
                value={userData.name}
                placeholder='e.g John Doe'
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='age'
                className='block text-altTxt text-sm md:text-base font-medium'
              >
                Age
              </label>
              <input
                type='text'
                id='age'
                name='age'
                autoComplete='off'
                onChange={(e) => handleChange(e)}
                value={userData.age}
                placeholder='e.g 10'
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='grade'
                className='block text-altTxt text-sm md:text-base font-medium'
              >
                Grade
              </label>
              <input
                id='grade'
                name='grade'
                type='text'
                autoComplete='off'
                onChange={(e) => handleChange(e)}
                value={userData.grade}
                placeholder='e.g 6th grade'
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='grade'
                className='block text-altTxt text-sm md:text-base font-medium'
              >
                Favourite Subject
              </label>
              <input
                id='subject'
                name='subject'
                type='text'
                autoComplete='off'
                onChange={(e) => handleChange(e)}
                value={userData.grade}
                placeholder='e.g Mathematics'
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='bg-main mt-4 text-mainTxt p-3 rounded-md hover:shadow-xl  transition duration-300'
            >
              {loading ? 'Saving' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
