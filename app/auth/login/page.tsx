// login
'use client';
import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { loginUser } from '@/utils/authApi';
// import { activeLoading } from '@/redux/user/userSlice';
import { IRootState } from '@/redux/store';
import Link from 'next/link';

const Login = () => {
  //   const { loading } = useSelector((store: IRootState) => store.user);
  //   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (e: SyntheticEvent) => {
    setError('');
    e.preventDefault();
    //  if (email && password) {
    //    dispatch(
    //      loginUser({
    //        email,
    //        password,
    //      })
    //    )
    //      .then((e) => {
    //        router.push('/dashboard');
    //      })
    //      .catch((e) => {
    //        setError('Email or Password Not Correct');
    //        dispatch(activeLoading(false));
    //      });
    //  }
  };

  return (
    <>
      <span className='absolute z-10 w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-darkAccent -top-10 -left-10 md:-top-20 lg:-top-52 lg:-left-40'></span>
      <span className='absolute z-[5] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-main -top-10 -left-20 md:-top-20 lg:-top-52 lg:-left-40'></span>
      <span className='absolute w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-gold -top-10 left-20 md:-top-20 lg:-top-52 lg:left-52'></span>
      <section className='min-h-screen min-w-screen flex justify-center items-center relative'>
        <div className='z-20 w-full max-w-[500px] mx-auto p-10 flex flex-col gap-4'>
          <div className='mb-20'>
            <h1 className='relative font-semibold text-altTxt text-lg md:text-xl lg:text-2xl'>
              Welcome Back
            </h1>
          </div>

          <form className='relative flex flex-col gap-6' onSubmit={handleLogin}>
            {error !== '' && (
              <span className='text-rose-600 font-semibold'>{error}</span>
            )}
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='email'
                className='block text-altTxt text-sm md:text-base font-medium'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='test@gmail.com'
                className='sm:text-sm rounded-lg w-full p-4 bg-blue-400/20 outline-none'
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label
                htmlFor='password'
                className='block text-altTxt text-sm md:text-base font-medium'
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='off'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Enter password'
                className='sm:text-sm rounded-lg w-full p-4 bg-blue-400/20 outline-none'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='bg-main mt-4 text-mainTxt p-3 rounded-md hover:shadow-xl  transition duration-300'
            >
              {loading ? 'Creating account' : 'Sign up'}
            </button>
          </form>

          <div className='text-sm flex gap-1 justify-center my-4'>
            <p>Have an account?</p>
            <Link href='/auth/sign-up' className='underline font-semibold'>
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
