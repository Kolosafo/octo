'use client';
import Filter from '@/components/filter';
import Subject from '@/components/subject';
import { subjects } from '@/mockups/subjects';
export default function Home() {
  return (
    <>
      <section className='relative min-h-[85vh] gradient'>
        <div className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5'>
          <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
            Ready to <span className='text-altTxt'>learn?</span>
          </h1>
        </div>
        <div className='relative p-6 md:py-10 lg:py-20 flex flex-col gap-20 bg-white min-h-screen rounded-t-3xl'>
          <Filter />
          <div className='flex gap-10 flex-wrap justify-center transition-all'>
            {subjects.map((subject) => (
              <Subject key={subject.name} {...subject} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
