import { SetStateAction, createContext, useContext } from "react";

type TStageContext = {
  stage: number;
  words: string[];
  foundWords: string[];
  setFoundWords: React.Dispatch<SetStateAction<string[]>>;
};
export const StageContext = createContext<TStageContext>({
  stage: 1,
  words: [],
  foundWords: [],
  setFoundWords: () => {},
});

export const useStageContext = () => {
  const context = useContext(StageContext);

  if (context === undefined) {
    throw new Error("Cannot use stage context outside StageContextProvider !");
  }

  return context;
};
