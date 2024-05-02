"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import octo from "../../../public/octo.svg";
import { UpdateProfileReqType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { updateUserProfile } from "@/api/account";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading, isLogged } = useSelector(
    (store: IRootState) => store.user
  );
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UpdateProfileReqType>({
    // AS PER THE BACKEND DATA TYPE
    school_level: "",
    grade_level: 0,
    country: "",
    gender: "",
    DOB: "",
    learningPace: "Slow",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((data) => ({
      ...data,
      [name]: name === "grade_level" ? parseInt(value) : value,
    }));
  };

  const runKyc = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !userData.school_level ||
      !userData.grade_level ||
      !userData.country ||
      !userData.gender ||
      !userData.DOB
    ) {
      setError("all fields are required");
      return;
    }
    dispatch(updateUserProfile(userData))
      .then((res) => {
        if (res.payload.errors) {
          setError(res.payload.errors);
          return;
        }
        router.push("/learn");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
  }, [router, isLogged]);
  return (
    <section className="gradient min-h-[85vh]">
      <div className="sticky top-0 min-h-[30vh] flex items-center justify-center gap-2 p-5">
        <h1 className="text-mainTxt text-2xl lg:text-4xl font-bold">
          <span className="block">Hello friend</span>
          I&apos;m <span className="text-altTxt">Octo</span> and you are?
        </h1>
        <Image src={octo} alt="" width={200} height={200} />
      </div>
      <div className="relative z-10 py-6 lg:px-24 bg-white min-h-screen rounded-t-3xl">
        <div className="w-full max-w-[500px] mx-auto p-10 flex flex-col gap-4 z-10 relative">
          <form className="relative flex flex-col gap-6" onSubmit={runKyc}>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="school_level"
                className="block text-altTxt text-sm md:text-base font-medium"
              >
                Current Education Level
              </label>
              <select
                name="school_level"
                id="school_level"
                className="py-4 px-4 rounded-md shadow-md element transition duration-300"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select</option>
                <option value="middle school">Middle School</option>
                {/* // THESE ARE STRICTLY THE VALUES ACCEPTED BY THE BACKEND --> "middle school" & "high school" */}
                <option value="high school">High School</option>
              </select>
            </div>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="grade_level"
                className="block text-altTxt text-sm md:text-base font-medium"
              >
                Current Grade
              </label>
              <select
                name="grade_level"
                id="grade_level"
                className="py-4 px-4 rounded-md shadow-md element transition duration-300"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select</option>
                {/* THE VALUES MUST BE AN INTEGER */}
                <option value={5}>Grade 5</option>
                <option value={6}>Grade 6</option>
                <option value={7}>Grade 7</option>
                <option value={8}>Grade 8</option>
                <option value={9}>Grade 9</option>
                <option value={10}>Grade 10</option>
                <option value={11}>Grade 11</option>
                <option value={12}>Grade 12</option>
              </select>
            </div>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="gender"
                className="block text-altTxt text-sm md:text-base font-medium"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="py-4 px-4 rounded-md shadow-md element transition duration-300"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select</option>
                {/* // THESE ARE STRICTLY THE VALUES ACCEPTED BY THE BACKEND --> "Male", "Female" & "Prefer not to say" */}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="gender"
                className="block text-altTxt text-sm md:text-base font-medium"
              >
                Do you consider yourself a fast or slow learner?
              </label>
              <select
                name="gender"
                id="gender"
                className="py-4 px-4 rounded-md shadow-md element transition duration-300"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select</option>
                {/* // THESE ARE STRICTLY THE VALUES ACCEPTED BY THE BACKEND --> "Male", "Female" & "Prefer not to say" */}
                <option value="Male">Fast</option>
                <option value="Female">Slow</option>
                <option value="I don't know">I don&apos;t know</option>
              </select>
            </div>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="DOB"
                className="block text-altTxt text-sm md:text-base font-medium"
              >
                Date of Birth
              </label>
              <input
                id="DOB"
                name="DOB"
                type="date"
                onChange={(e) => handleChange(e)}
                value={userData.DOB}
                className="sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt"
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="country"
                className="block text-altTxt text-sm md:text-base font-medium"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                value={userData.country}
                placeholder="e.g United States of America"
                className="sm:text-sm rounded-lg w-full p-4 bg-black/20 outline-none text-mainTxt placeholder:text-mainTxt"
              />
            </div>

            {error && (
              <span className="text-rose-600 font-semibold">{error}</span>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-main mt-4 text-mainTxt p-3 rounded-md hover:shadow-xl  transition duration-300"
            >
              {isLoading ? "Saving" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
