"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

export type TopicCardType = {
  courseId: number | string;
  subject: string;
  numOfLessons?: number;
  progressPercentage?: number | string;
  type: "Full course" | "Short course";
};
const TopicCard: FC<TopicCardType> = ({
  subject,
  courseId,
  numOfLessons,
  progressPercentage,
  type,
}) => {
  const router = useRouter();
  return (
    <div className="h-[40%] w-full rounded-md flex flex-col py-6 px-10 light-peach-bg">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white">{subject}</span>
          {numOfLessons === 0 && type !== "Short course" ? (
            <span
              className="cursor-pointer"
              onClick={() => router.push(`/learn/curriculum/${courseId}`)}
            >
              Get started
            </span>
          ) : (
            type !== "Short course" && (
              <span className="font-semibold text-black">
                {numOfLessons} Sections
              </span>
            )
          )}
        </div>

        <div className="h-full flex flex-col justify-between">
          <Image
            src={"/img/darkArrow.png"}
            alt="arrow"
            width={25}
            height={25}
            className="object-contain cursor-pointer"
            onClick={() =>
              type === "Full course"
                ? router.push(`/learn/curriculum/${subject}/${courseId}`)
                : router.push(
                    `/learn/quick-learn?subject=${subject}&subjectId=${courseId}&isComplete=complete`
                  )
            }
          />
        </div>
      </div>
      <span className="font-semibold self-end">
        {progressPercentage}% complete
      </span>
    </div>
  );
};

export default TopicCard;
