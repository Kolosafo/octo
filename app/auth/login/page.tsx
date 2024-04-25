"use client";

import { useSelector } from "react-redux";

import { IRootState } from "@/redux/store";
import useAuthHooks from "@/app/_hooks/authHook";
import Loading from "@/app/_components/Loading";

function Login() {
  const { isLoading } = useSelector((store: IRootState) => store.user);
  const { SignInWithGoogle, SignUpWithGoogle, error } = useAuthHooks();
  return (
    <div className="h-screen w-screen flex justify-center items-center relative flex-col">
      <span>{error}</span>
      {isLoading ? (
        <Loading lessonTitle="Autheticating..." />
      ) : (
        <>
          <button
            onClick={SignUpWithGoogle}
            type="button"
            className="px-2 py-1 border-2 border-black"
            style={{ marginTop: "20px" }}
          >
            Sign up with Google
          </button>

          <button
            onClick={SignInWithGoogle}
            type="button"
            className="px-2 py-1 border-2 border-rose-500"
            style={{ marginTop: "20px" }}
          >
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
