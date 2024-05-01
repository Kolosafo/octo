import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';
import placeholder from '../public/placeholder.jpg';

export default function Page() {
  return (
    <section className='min-h-screen grid place-items-center md:grid-cols-2 gap-4 lg:px-24'>
      <div className='flex flex-col gap-6 lg:gap-10 justify-center h-full'>
        <h1 className='text-3xl lg:text-7xl font-bold mt-3'>
          Octo <span className='text-main'>The smart learning</span> AI tutor
        </h1>
        <p className='text-xl lg:text-2xl max-w-[900px]'>
          Supercharge your kids learning with Octo the personal AI tutor
          designed to make learning as fun as possible.
        </p>
        <div className='flex gap-8'>
          <Link
            href='/learn'
            className='w-fit p-2 flex items-center justify-center font-semibold rounded-md gap-2 border-2 border-main hover:bg-main/10 outline-none min-w-[8rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300'
          >
            Learn
            <BsArrowRight aria-hidden='true' />
          </Link>
          <Link
            href='/auth/sign-in'
            className='w-fit p-2 flex items-center justify-center font-semibold rounded-md gap-2 border-2 border-main hover:bg-main/10 outline-none min-w-[8rem] focus-visible:gap-4 focus-visible:bg-main/10 transition-all duration-300'
          >
            Enroll
            <BsArrowRight aria-hidden='true' />
          </Link>
        </div>
      </div>
      <div className='relative'>
        <Image
          src={"/octo.svg"}
          alt='hero image'
          width={500}
          height={600}
          className='object-cover rounded-lg relative z-10 shadow-xl'
        />
        <div
          aria-hidden='true'
          className='absolute top-3 -left-2.5 rounded-lg border-dashed border-2 border-main/50 w-full h-full'
        ></div>
      </div>
    </section>
  );
}
