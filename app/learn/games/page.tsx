import Subject from '@/components/subject';
import Link from 'next/link';
import { BiPlay } from 'react-icons/bi';

function Page() {
  return (
    <section className='relative min-h-screen gradient'>
      <div className='sticky top-0 min-h-[30vh] flex items-center justify-center'>
        <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          Games
        </h1>
      </div>

      <div className='relative p-6 bg-white min-h-[70vh]'>
        <div className='p-10 flex gap-10 flex-wrap transition-all'>
          <Link
            href={'/games/octoCrush'}
            className='bg-main rounded-lg min-h-40 min-w-40 p-2 flex flex-col gap-4 outline-main outline-offset-2 outline-2 focus-visible:outline transition duration-300'
          >
            <div className='bg-mainBg w-full h-full rounded-md'></div>
            <div className='flex gap-4 items-center text-mainTxt'>
              <h3 className='font-semibold'>Octo Crush</h3>
              <BiPlay size={25}/>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page;
