"use client";
import { generateOctoCruchGame } from "@/gemini/octoCrush/prompt";
import { GameDataType } from "@/mockups/dummyOctoCrushData";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dispatch } from "react";

const useGenerateOctoCrush = ({
  finishedFullCourseTopics,
  setGameData,
}: {
  finishedFullCourseTopics: string[] | null;
  setGameData: Dispatch<React.SetStateAction<GameDataType | null>>;
}) => {
  const { isLogged } = useSelector((store: IRootState) => store.user);

  const router = useRouter();
  const [isStateLoading, setIsStateLoading] = useState(false);

  useEffect(() => {
    console.log("LOADING...");
    if (isLogged) {
      (async () => {
        setIsStateLoading(true);
        if (finishedFullCourseTopics) {
          const response = await generateOctoCruchGame({
            subjectsStudied: finishedFullCourseTopics,
          });
          console.log("DONE LOADING...", response);
          setIsStateLoading(false);
          setGameData(response);
        }
      })();
    } else {
      router.push("/auth/login");
    }
  }, [finishedFullCourseTopics, isLogged, router, setGameData]);

  return {
    isStateLoading,
  };
};

export default useGenerateOctoCrush;
