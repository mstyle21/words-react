import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const DATA_KEY = "data";

export type TUserProgress = {
  currentStage: number;
};

const defaultProgression: TUserProgress = {
  currentStage: 1,
};

export const useProgress = () => {
  const { getItem, setItem } = useLocalStorage();
  const [progress, setProgress] = useState(() => {
    const localData = getItem(DATA_KEY);

    if (localData) {
      return JSON.parse(localData);
    }

    setItem(DATA_KEY, JSON.stringify(defaultProgression));
    return defaultProgression;
  });

  const updateProgress = (progress: TUserProgress) => {
    setProgress(progress);
    setItem(DATA_KEY, JSON.stringify(progress));
  };

  return { progress, updateProgress };
};
