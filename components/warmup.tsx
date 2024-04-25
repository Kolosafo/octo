import octo from '../public/octo.svg';
import Image from 'next/image';

export default function Warmup() {
  return (
    <div className='grid min-h-screen bg-main place-content-center grid-rows-[1fr_auto] pb-10'>
      <div className='flex flex-col justify-center gap-8'>
        <Image src={octo} alt='' width={250} height={250} />
        <h1 className='text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          Warming Up
        </h1>
      </div>
      <div>
        <p className='text-mainTxt text-center'>Please wait, setting questions.</p>
      </div>
    </div>
  );
}
