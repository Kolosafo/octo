"use client";
import { keepUserLogged } from "@/api/account";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const BaseAppWrapper = ({
  children,
  fontFamily,
}: {
  children: React.ReactNode;
  fontFamily: any;
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [authTokens, setAuthTokens] = useState<any>(null);

  useEffect(() => {
    const getUserfromLocalStorage = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "")
      : null;
    setAuthTokens(getUserfromLocalStorage);
  }, []);

  useEffect(() => {
    if (authTokens && authTokens.refresh) {
      dispatch(keepUserLogged(authTokens.refresh));
    }
  }, [authTokens, dispatch]);

  return (
    <body className={fontFamily}>
      <main className='relative min-h-screen w-full'>{children}</main>
      <div id='portal'></div>
    </body>
  );
};

export default BaseAppWrapper;
