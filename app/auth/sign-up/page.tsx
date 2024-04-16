// // signup
// 'use client';
// import React, { SyntheticEvent, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Loader from '../../../components/loader';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { registerUser } from '@/utils/authApi';
// import { IRootState } from '@/redux/store';
// import Blur from '@/components/blur';
// import Link from 'next/link';

// const Signup = () => {
//   const { error } = useSelector((store: IRootState) => store.user);
//   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPass, setConfirmPass] = useState<string>('');
//   const [isloading, setIsLoading] = useState<boolean>(false);
//   const [_error, setError] = useState<string>('');

//   const router = useRouter();

//   const runRegister = (e: SyntheticEvent) => {
//     setError('');
//     e.preventDefault();
//     if (email && password && confirmPass) {
//       if (password === confirmPass) {
//         setIsLoading(true);
//         dispatch(
//           registerUser({
//             email,
//             password,
//             password_confirm: confirmPass,
//           })
//         ).then((e) => {
//           if (error) {
//             setError('An unknownk Error Occured');
//             setIsLoading(false);
//             return;
//           } else {
//             if (e.payload === 'User with this email already exists') {
//               setError('User with this email already exists, TRY LOG IN');
//             } else {
//               console.log(e.payload);
//               router.push('/auth/sign-in');
//             }
//           }
//           setIsLoading(false);
//         });
//       } else {
//         setError('Passwords do not match');
//         setIsLoading(false);
//       }
//     } else {
//       setError('Please fill the form correctly');
//     }
//   };

//   return (
//     <>
//       <Blur />
//       <section className='min-h-[90vh] min-w-screen flex justify-center items-center'>
//         <div className='relative z-10 w-full max-w-[500px] bg-mainBg shadow-sm rounded-lg mx-auto p-6 flex flex-col gap-4'>
//           <div className='my-4'>
//             <h1 className='font-semibold text-lg md:text-xl lg:text-2xl'>
//               Create account
//             </h1>
//           </div>

//           <form className='relative flex flex-col gap-6' onSubmit={runRegister}>
//             {
//               _error !=='' && <span className='text-rose-600 font-semibold'>{_error}</span>
//             }
//             <div className='flex flex-col gap-2.5'>
//               <label
//                 htmlFor='email'
//                 className='block text-mainTxt text-sm md:text-base font-medium'
//               >
//                 Email
//               </label>
//               <input
//                 type='email'
//                 id='email'
//                 name='email'
//                 autoComplete='off'
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 placeholder='test@gmail.com'
//                 className='sm:text-sm rounded-lg w-full p-4 bg-cardBg outline-none'
//               />
//             </div>
//             <div className='flex flex-col gap-2.5'>
//               <label
//                 htmlFor='password'
//                 className='block text-mainTxt text-sm md:text-base font-medium'
//               >
//                 Password
//               </label>
//               <input
//                 id='password'
//                 name='password'
//                 type='password'
//                 autoComplete='off'
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 placeholder='Enter password'
//                 className='sm:text-sm rounded-lg w-full p-4 bg-cardBg outline-none'
//               />
//             </div>
//             <div className='flex flex-col gap-2.5'>
//               <label
//                 htmlFor='confirm'
//                 className='block text-mainTxt text-sm md:text-base font-medium'
//               >
//                 Confirm Password
//               </label>
//               <input
//                 id='confirm'
//                 name='confirm'
//                 type='password'
//                 autoComplete='off'
//                 onChange={(e) => setConfirmPass(e.target.value)}
//                 value={confirmPass}
//                 placeholder='Confirm password'
//                 className='sm:text-sm rounded-lg w-full p-4 bg-cardBg outline-none'
//               />
//             </div>
//             <button
//               type='submit'
//               disabled={isloading}
//               className='bg-accent mt-4 text-main p-3 rounded-md hover:shadow-xl  transition duration-300'
//             >
//               {isloading ? 'Creating account' : 'Sign up'}
//             </button>
//           </form>

//           <div className='text-sm flex gap-1 justify-center my-4'>
//             <p>Have an account?</p>
//             <Link
//               href='/auth/sign-in'
//               className='underline font-semibold'
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Signup;
