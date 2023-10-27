import { SetStateAction, createContext } from "react";

type TStageContext = {
  words: string[];
  foundWords: string[];
  setFoundWords: React.Dispatch<SetStateAction<string[]>>;
};
export const StageContext = createContext<TStageContext>({
  words: [],
  foundWords: [],
  setFoundWords: () => {},
});
