import { SetStateAction, createContext } from "react";

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
