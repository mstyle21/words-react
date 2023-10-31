import { SetStateAction, useState } from "react";
import WordsContainer from "../components/WordsContainer";
import LettersContainer from "../components/LettersContainer";
import { StageContext } from "../context/StageContext";
import { PAGES } from "../App";

const Stage = ({
  words,
  setCurrentPage,
}: {
  words: string[];
  setCurrentPage: React.Dispatch<SetStateAction<PAGES>>;
}) => {
  const [foundWords, setFoundWords] = useState<string[]>([]);

  if (foundWords.length === words.length) {
    return <h1 style={{ textAlign: "center", color: "white" }}>Congratulations!</h1>;
  }

  words = words.sort((a, b) => {
    return a.length - b.length;
  });

  return (
    <StageContext.Provider value={{ words, foundWords, setFoundWords }}>
      <div className="stage-container">
        <WordsContainer />
        <LettersContainer />
        <button
          className="game-btn"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
          onClick={() => {
            setCurrentPage("stage-selection");
          }}
        >
          Inapoi
        </button>
      </div>
    </StageContext.Provider>
  );
};

export default Stage;
