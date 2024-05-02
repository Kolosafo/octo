"use client";
import { keepUserLogged } from "@/api/account";
import { logout } from "@/redux/auth/authSlice";
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

  useEffect(() => {
    const getUserfromLocalStorage = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") || "")
      : null;

    if (getUserfromLocalStorage && getUserfromLocalStorage.refresh) {
      dispatch(keepUserLogged(getUserfromLocalStorage.refresh));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <body className={fontFamily}>
      <main className="relative min-h-screen w-full">{children}</main>
      <div id="portal"></div>
    </body>
  );
};

export default BaseAppWrapper;
