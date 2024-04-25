'use client';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/store';
import useAuthHooks from '@/app/_hooks/authHook';
import Loader from '@/components/loader';
import Image from 'next/image';
import googleLogo from '../../../public/google.svg'

function Login() {
  const { isLoading } = useSelector((store: IRootState) => store.user);
  const { SignInWithGoogle, SignUpWithGoogle, error } = useAuthHooks();

  return (
    <>
      <span className='absolute z-10 w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-darkAccent -top-10 -left-10 md:-top-20 lg:-top-52 lg:-left-40'></span>
      <span className='absolute z-[5] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-main -top-10 -left-20 md:-top-20 lg:-top-52 lg:-left-40'></span>
      <span className='absolute w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] rounded-full bg-gold -top-10 left-20 md:-top-20 lg:-top-52 lg:left-52'></span>
      <div className='min-h-screen grid place-content-center'>
        {error && <span>{error}</span>}
        {isLoading ? (
          <Loader label='Autheticating...' />
        ) : (
          <>
            <div className='h-full grid place-content-center'>
              <div className='bg-white flex justify-between p-6 flex-col gap-5 rounded-md shadow-md min-h-[18rem] min-w-[20rem]'>
                <div className='mt-4'>
                  <h1 className='font-bold text-4xl'>Welcome</h1>
                  <small>Choose how to continue</small>
                </div>

                <div className='flex flex-col gap-5'>
                  <button
                    type='button'
                    onClick={SignInWithGoogle}
                    className='text-main flex items-center gap-4 p-3 rounded-md border-2 border-main hover:bg-main/20 focus-visible:bg-main/20 focus-visible:border-dotted outline-none transition duration-300'
                  >
                    <Image src={googleLogo} alt='google' width={24} height={24} />
                    <span className='text-darkTxt dark:text-lightTxt'>
                      Sign in with Google
                    </span>
                  </button>
                  <button
                    type='button'
                    onClick={SignUpWithGoogle}
                    className='text-main flex items-center gap-4 p-3 rounded-md border-2 border-main hover:bg-main/20 focus-visible:bg-main/20 focus-visible:border-dotted outline-none transition duration-300'
                  >
                    <Image src={googleLogo} alt='google' width={24} height={24} />
                    <span className='text-darkTxt dark:text-lightTxt'>
                      Sign up with Google
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
