"use client";
import { loginUser, registerUser } from "@/api/account";
import { auth, googleProvider } from "@/firebase";
import { activeLoading } from "@/redux/auth/authSlice";
import { IRootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useAuthHooks = () => {
  const router = useRouter();
  const { isLoading, isLogged, user } = useSelector(
    (store: IRootState) => store.user
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [error, setError] = useState<string>("");

  // SIGN IN FUNCTION
  const handleSendLogin = (email: string, password: string) => {
    setError("");
    dispatch(
      loginUser({
        email,
        password,
      })
    )
      .then((e) => {
        if (isLogged && !user.gradeLevel) {
          router.push("/kyc");
          return;
        }
        router.push("/learn");
      })
      .catch((e) => {
        setError("Account does not exist, Click Signup with google");
        dispatch(activeLoading(false));
      });
  };
  const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email) {
        handleSendLogin(result.user.email, result.user.uid);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // SIGN UP FUNCTION

  const handleSendSignUp = (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    profilePic?: string
  ) => {
    setError("");
    dispatch(
      registerUser({
        first_name,
        last_name,
        email,
        password,
        password_confirm: password,
        profile_picture: profilePic,
      })
    )
      .then((e) => {
        if (e.payload === "User with this email already exists") {
          setError("User with this email already exists, TRY LOG IN");
        } else {
          router.push("/learn"); //USER IS GOING TO KYC FROM SIGN UP
        }
      })
      .catch((e) => {
        setError("Email or Password Not Correct");
        dispatch(activeLoading(false));
      });
  };

  const SignUpWithGoogle = async () => {
    console.log("BEING PRESSED RN");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email) {
        handleSendSignUp(
          result.user.displayName
            ? result.user.displayName.split(" ")[0]
            : "anonymous",
          result.user.displayName
            ? result.user.displayName.split(" ")[1]
            : "anonymous",
          result.user.email,
          result.user.uid,
          result.user.photoURL ? result.user.photoURL : undefined
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return { SignInWithGoogle, SignUpWithGoogle, error };
};
export default useAuthHooks;
