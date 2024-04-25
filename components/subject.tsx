import Image from 'next/image';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';

interface SubjectProps {
  name: string;
  image?: string;
  description?: string;
}

function Subject(props: SubjectProps) {
  const subjectRoute = props.name.toLowerCase().replace(/\s/g, '-');

  return (
    <Link
      href={'/learn/' + subjectRoute}
      className='bg-main rounded-lg min-h-60 min-w-60 p-6 flex flex-col gap-4 outline-main outline-offset-2 outline-2 focus-visible:outline transition duration-300'
    >
      <div className='flex gap-4 items-center text-mainTxt'>
        <h3 className='font-semibold'>{props.name}</h3>
        <BiChevronRight/>
      </div>
      <div className='bg-white w-full h-full rounded-md'>

      </div>
    </Link>
  );
}

export default Subject;
