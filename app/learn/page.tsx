"use client";
import React, { useState } from "react";
import TopicCard, { TopicCardType } from "../_components/TopicCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [learningTopics, setLearningTopics] = useState<TopicCardType[] | null>([
    {
      progressPercentage: 40,
      id: 1,
      subject: "Linear Algebra",
      numOfLessons: 9,
    },
    {
      progressPercentage: 83,
      id: 2,
      subject: "Probability",
      numOfLessons: 12,
    },
  ]);
  
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="relative violet-bg px-16 py-20 -mb-5">
        <span className="text-7xl font-bold text-white">
          Ready to <span className="block light-peach-text">learn?</span>
        </span>
        <Image
          alt="octo"
          width={400}
          height={400}
          src={"/octo.png"}
          className="absolute -bottom-14 right-4"
          unoptimized
        />
      </div>
      <div className="h-full w-full relative rounded-t-3xl flex flex-col gap-8 z-10 p-20 bg-white min-h-full">
        <button
          className="px-5 font-bold py-1 violet-bg absolute text-white top-2 right-8 rounded-md"
          onClick={() => router.push("/new-course")}
        >
          New
        </button>
        {!learningTopics || learningTopics.length === 0 ? (
          <div className="flex flex-col gap-4 items-center">
            <span>You haven&lsquo;t started learning any topics yet</span>
            <button className="violet-bg text-white px-4 py-2 rounded-md">
              Start Learning
            </button>
          </div>
        ) : (
          learningTopics.map((topic) => <TopicCard key={topic.id} {...topic} />)
        )}
      </div>
    </div>
  );
};

export default Page;
