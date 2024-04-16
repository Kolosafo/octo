// // login
// 'use client';
// import React, { SyntheticEvent, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { loginUser } from '@/utils/authApi';
// import { activeLoading } from '@/redux/user/userSlice';
// import { IRootState } from '@/redux/store';
// import Blur from '@/components/blur';
// import Link from 'next/link';

// const Login = () => {
//   const { loading } = useSelector((store: IRootState) => store.user);
//   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//   const router = useRouter();
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');

//   const handleLogin = (e: SyntheticEvent) => {
//     setError('');
//     e.preventDefault();
//     if (email && password) {
//       dispatch(
//         loginUser({
//           email,
//           password,
//         })
//       )
//         .then((e) => {
//           router.push('/dashboard');
//         })
//         .catch((e) => {
//           setError('Email or Password Not Correct');
//           dispatch(activeLoading(false));
//         });
//     }
//   };
//   return (
//     <>
//       <Blur />
//       <section className='min-h-[90vh] min-w-screen flex justify-center items-center'>
//         <div className='relative z-10 w-full max-w-[500px] bg-mainBg shadow-sm rounded-lg mx-auto p-6 flex flex-col gap-4'>
//           <div className='my-4'>
//             <h1 className='font-semibold text-lg md:text-xl lg:text-2xl'>
//               Login to account
//             </h1>
//           </div>

//           <form className='relative flex flex-col gap-6' onSubmit={handleLogin}>
//             {
//               error !=='' && <span className='text-rose-600 font-semibold'>{error}</span>
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
            
//             <button
//               type='submit'
//               disabled={loading}
//               className='bg-accent mt-4 text-main p-3 rounded-md hover:shadow-xl  transition duration-300'
//             >
//               {loading ? 'Logging in' : 'Login'}
//             </button>
//           </form>

//           <div className='text-sm flex justify-center gap-1 my-2'>
//             <p>New user?</p>
//             <Link
//               href='/auth/sign-up'
//               className='underline font-semibold'
//             >
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;
