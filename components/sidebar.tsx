'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.svg';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className={`w-52 fixed h-screen flex flex-col gap-6 p-6`}>
      <div>
        <Link href='/'>
          <h1 className='text-acc flex font-bold'>
            <Image
              src={logo}
              alt=''
              width={40}
              height={40}
            />
          </h1>
        </Link>
      </div>
      <button type='button' onClick={toggleMenu}>X</button>
      <nav>
        <ul
          className={`flex flex-col gap-6 min-w-full py-10 text-main `}
        >
          <li className='hover:text-pri transition duration-300'>
            <Link
              href='/'
              className='outline-2 focus-visible:outline-pri tracking-widest uppercase text-sm max-md:text-white font-medium'
            >
              Home
            </Link>
          </li>
          <li className='hover:text-pri transition duration-300'>
            <Link
              href='/settings'
              className='outline-2 focus-visible:outline-pri tracking-widest uppercase text-sm max-md:text-white font-medium'
            >
              Settings
            </Link>
          </li>
          <li className='hover:text-pri transition duration-300'>
            <Link
              href='/profile'
              className='outline-2 focus-visible:outline-pri tracking-widest uppercase text-sm max-md:text-white font-medium'
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Sidebar;
