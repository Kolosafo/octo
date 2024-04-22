'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.svg';
import { BiBook, BiLineChart } from 'react-icons/bi';
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';
import { MdMoreVert } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { GoHome } from 'react-icons/go';
import { MdFormatListBulletedAdd } from 'react-icons/md';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const pathname = usePathname();

  if (!pathname.includes('/learn')) return <div className='w-0'></div>;

  return (
    <header className='border-r bg-white'>
      <nav className='sticky top-0 h-full max-h-[100svh] flex flex-col gap-6 py-6 px-4 justify-between transition-all duration-300'>
        {/* logo & toggle*/}
        <div
          className={`flex gap- ${
            expanded ? 'gap-0' : 'flex-col gap-4'
          } justify-between items-center`}
        >
          <Link href='/'>
            <h1 className='text-main flex text-xl items-center font-bold'>
              <Image src={logo} alt='' width={40} height={40} />
              <span
                className={`overflow-hidden transition-all uppercase ${
                  expanded ? 'ml-4' : 'w-0 ml-0'
                }`}
              >
                Octo
              </span>
            </h1>
          </Link>
          <button
            type='button'
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Close' : 'Open'}
            className='w-10 h-10 rounded-md bg-main text-mainTxt flex items-center justify-center focus-visible:outline-main focus-visible:bg-white focus-visible:text-main hover:bg-white border-2 hover:border-main hover:text-main transition duration-300'
          >
            {expanded ? (
              <LuChevronFirst size={20} />
            ) : (
              <LuChevronLast size={20} />
            )}
          </button>
        </div>

        {/* main nav */}
        <ul className='flex flex-col gap-8 min-w-full py-10'>
          <li>
            <Link
              href='/'
              className='tracking-widest text-sm font-medium flex items-center group focus-visible:outline-main focus-visible:text-main'
            >
              <GoHome size={25} className='group-hover:text-main' />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? 'ml-4' : 'w-0 ml-0'
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              href='/learn'
              className='tracking-widest text-sm font-medium flex items-center group focus-visible:outline-main focus-visible:text-main'
            >
              <BiBook size={25} className='group-hover:text-main' />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? 'ml-4' : 'w-0 ml-0'
                }`}
              >
                Learn
              </span>
            </Link>
          </li>
          <li>
            <Link
              href='/performance'
              className='tracking-widest text-sm font-medium flex items-center group focus-visible:outline-main focus-visible:text-main'
            >
              <BiLineChart size={25} className='group-hover:text-main' />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? 'ml-4' : 'w-0 ml-0'
                }`}
              >
                Performance
              </span>
            </Link>
          </li>
          <li>
            <Link
              href='/learn/lessons'
              className='tracking-widest text-sm font-medium flex items-center group focus-visible:outline-main focus-visible:text-main'
            >
              <MdFormatListBulletedAdd
                size={25}
                className='group-hover:text-main'
              />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? 'ml-4' : 'w-0 ml-0'
                }`}
              >
                Your lessons
              </span>
            </Link>
          </li>
          <li>
            <Link
              href='/settings'
              className='tracking-widest text-sm font-medium flex items-center group focus-visible:outline-main focus-visible:text-main'
            >
              <IoSettingsOutline size={25} className='group-hover:text-main' />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? 'ml-4' : 'w-0 ml-0'
                }`}
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>

        {/* user details / profile */}
        <div className='relative border-t flex pt-2'>
          <Image
            src=''
            alt='profile'
            className='w-10 h-10 rounded-md bg-main text-mainTxt'
          />
          <div
            className={`
              flex justify-between items-center gap-4
              overflow-hidden transition-all ${expanded ? 'ml-3' : 'w-0'}
          `}
          >
            <div className='leading-4'>
              <h4 className='font-semibold text-main'>Kolo Safo</h4>
              <span className='text-xs text-altTxt'>kolosafo@gmail.com</span>
            </div>
            <button
              type='button'
              title='more'
              className=''
              onClick={() => setShowMore(!showMore)}
            >
              <MdMoreVert size={20} />
            </button>
          </div>

          {/* logout | theme switch */}
          <div
            className={`absolute p-2 bg-mainBg  z-10 transition-all duration-300 w-full -right-[4.2rem] bottom-0 shadow-md rounded-md ${
              showMore
                ? 'max-w-[20rem] py-2 opacity-100'
                : 'max-w-0 py-0 opacity-0'
            }`}
          >
            <button
              type='button'
              className='w-full bg-main text-mainTxt text-center px-4 py-1.5 rounded-md outline-main outline-offset-1 outline-1 focus-visible:outline-dashed transition duration-300'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Sidebar;
