'use client';
import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
// import Loader from '../../../components/loader';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { registerUser } from '@/utils/authApi';
// import { IRootState } from '@/redux/store';
// import Blur from '@/components/blur';
import Link from 'next/link';

const Signup = () => {
  //   const { error } = useSelector((store: IRootState) => store.user);
  //   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [_error, setError] = useState<string>('');

  const router = useRouter();

  const Register = (e: SyntheticEvent) => {
    setError('');
    e.preventDefault();
    //  if (email && password && confirmPass) {
    //    if (password === confirmPass) {
    //      setIsLoading(true);
    //      dispatch(
    //        registerUser({
    //          email,
    //          password,
    //          password_confirm: confirmPass,
    //        })
    //      ).then((e) => {
    //        if (error) {
    //          setError('An unknownk Error Occured');
    //          setIsLoading(false);
    //          return;
    //        } else {
    //          if (e.payload === 'User with this email already exists') {
    //            setError('User with this email already exists, TRY LOG IN');
    //          } else {
    //            console.log(e.payload);
    //            router.push('/auth/sign-in');
    //          }
    //        }
    //        setIsLoading(false);
    //      });
    //    } else {
    //      setError('Passwords do not match');
    //      setIsLoading(false);
    //    }
    //  } else {
    //    setError('Please fill the form correctly');
    //  }
  };

  return (
    <>
      <span className='absolute z-10 w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-main -top-28 -left-28 md:-top-20 lg:-top-56 lg:-left-56'></span>
      <span className='fixed w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-white -bottom-20 -right-20 lg:-bottom-56 lg:-right-56'></span>
      <section className=' min-h-screen min-w-screen flex justify-center items-center bg-accent'>
        <div className='w-full max-w-[500px] mx-auto p-10 flex flex-col gap-4 z-10 relative'>
          <div className='text-mainTxt mb-20'>
            <h1 className='relative font-semibold text-lg md:text-xl lg:text-2xl'>
              Create account
            </h1>
          </div>

          <form className='relative flex flex-col gap-6' onSubmit={Register}>
            {_error !== '' && (
              <span className='text-rose-600 font-semibold'>{_error}</span>
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
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Full name'
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
              />
            </div>
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
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
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
                className='sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt'
              />
            </div>
            <button
              type='submit'
              disabled={isloading}
              className='bg-main mt-4 text-mainTxt p-3 rounded-md hover:shadow-xl  transition duration-300'
            >
              {isloading ? 'Creating account' : 'Sign up'}
            </button>
          </form>

          <div className='text-sm flex gap-1 justify-center my-4'>
            <p>Have an account?</p>
            <Link href='/auth/login' className='underline font-semibold'>
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
