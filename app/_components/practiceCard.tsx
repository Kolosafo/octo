"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

export type PracticeCardType = {
  subject: string;
};
const PracticeCard: FC<PracticeCardType> = ({ subject }) => {
  const router = useRouter();
  return (
    <div className="h-[40%] w-full rounded-md flex flex-col py-6 px-10 light-peach-bg">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-neutral-700 text-sm">practice</span>
          <span className="text-2xl font-bold text-white">{subject}</span>
        </div>

        <div className="h-full flex cursor-pointer gap-4 justify-center self-center">
          <span className="font-semibold self-end">Start</span>
          <Image
            src={"/img/darkArrow.png"}
            alt="arrow"
            width={20}
            height={20}
            className="object-contain "
            onClick={() => router.push(`/learn/practice/single/${subject}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeCard;
