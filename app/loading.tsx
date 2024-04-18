import octo from '../public/octo.svg';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className='grid min-h-screen bg-main place-content-center'>
      <div>
        <Image src={octo} alt='' width={500} height={500} />
        <h1 className='text-mainTxt font-semibold'>Warming Up</h1>
      </div>
      <div>
         <p>Please Wait</p>
      </div>
    </div>
  );
}
