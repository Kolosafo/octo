"use client";
import { loginUser, registerUser } from "@/api/account";
import { auth, googleProvider } from "@/firebase";
import { activeLoading } from "@/redux/auth/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
const useAuthHooks = () => {
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
        // router.push("/dashboard");
      })
      .catch((e) => {
        setError("Email or Password Not Correct");
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
          console.log(e.payload);
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
