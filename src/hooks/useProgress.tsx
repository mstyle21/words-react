import { useState } from "react";

const DATA_KEY = "data";

export type TUserProgress = {
  currentStage: number;
};

const defaultProgression: TUserProgress = {
  currentStage: 1,
};

export const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const localData = localStorage.getItem(DATA_KEY);

    if (localData) {
      return JSON.parse(localData);
    }

    localStorage.setItem(DATA_KEY, JSON.stringify(defaultProgression));
    return defaultProgression;
  });

  const updateProgress = (progress: TUserProgress) => {
    setProgress(progress);
    localStorage.setItem(DATA_KEY, JSON.stringify(progress));
  };

  return { progress, updateProgress };
};
