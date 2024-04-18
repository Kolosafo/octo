import octo from '../public/octo.svg';
import Image from 'next/image';

export default function Onboard() {
  return (
    <div className='grid min-h-screen bg-main place-content-center'>
      <div>
        <Image src={octo} alt='' width={500} height={500} />
        <h1 className='text-mainTxt font-semibold'>octo</h1>
      </div>
    </div>
  );
}
