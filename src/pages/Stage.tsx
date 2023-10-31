import { useEffect, useState } from "react";
import WordsContainer from "../components/WordsContainer";
import LettersContainer from "../components/LettersContainer";
import { StageContext } from "../context/StageContext";
import { PAGES } from "../App";
import { stages } from "../data/stages";

type StageProps = {
  words: string[];
  stage: number;
  changePage: (page: PAGES) => void;
  stageSelection: (level: number) => void;
  updateProgress: (level: number) => void;
};
const Stage = ({ words, stage, changePage, stageSelection, updateProgress }: StageProps) => {
  const [foundWords, setFoundWords] = useState<string[]>([]);

  words = words.sort((a, b) => {
    return a.length - b.length;
  });

  useEffect(() => {
    if (foundWords.length === words.length) {
      updateProgress(stage + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundWords.length]);

  return (
    <StageContext.Provider value={{ words, foundWords, setFoundWords }}>
      <div className="stage-container">
        <div className="top-info">
          <span></span>
          <h1 className="level-info">Nivelul {stage}</h1>
          <span></span>
        </div>
        <WordsContainer />
        <LettersContainer />
        <button
          className="game-btn stage-back-btn"
          onClick={() => {
            changePage("stage-selection");
          }}
        >
          Inapoi
        </button>
        {foundWords.length === words.length && (
          <>
            <div className="finish-overlay">
              <h1 style={{ textAlign: "center", color: "white" }}>Congratulations!</h1>
            </div>
            {stage < stages.length && (
              <button className="game-btn next-stage-btn" onClick={() => stageSelection(stage + 1)}>
                Nivelul {stage + 1}
              </button>
            )}
          </>
        )}
      </div>
    </StageContext.Provider>
  );
};

export default Stage;
