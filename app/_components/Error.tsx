import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const router = useRouter();
  return (
    <div className="max-w-screen-md mx-auto min-h-[60vh] flex flex-col gap-8 items-center text-center">
      <Image src={"/octo.svg"} width={300} height={300} alt="octo" />
      <p>Oops! Professor Octo is ran into a problem</p>
      <button
        onClick={() => {
          router.push("/learn");
        }}
        className="px-3 text-lg text-white font-semibold py-1 rounded-md violet-bg"
      >
        Home
      </button>
    </div>
  );
};

export default Error;
