'use client';
import { keepUserLogged } from '@/api/account';
import { ReduxProvider } from '@/redux/provider';
import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReduxWrapper from './ReduxWrapper';
import { IRootState } from '@/redux/store';
import AuthLoading from './_components/authLoading';
import { useRouter } from 'next/navigation';
const BaseAppWrapper = ({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: any;
}) => {
  const router = useRouter();
  const { authLoading } = useSelector((store: IRootState) => store.user);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [authTokens, setAuthTokens] = useState<any>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "{}")
      : null
  );

  useEffect(() => {
    if (authTokens && authTokens.refresh) {
      dispatch(keepUserLogged(authTokens.refresh));
    }
  }, [authTokens, dispatch]);
  
  return (
    <body className={fontFamily}>
      <main className='relative min-h-screen w-full'>{children}</main>
    </body>
  );
};

export default BaseAppWrapper;
