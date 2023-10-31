import { useContext } from "react";
import { StageContext } from "../context/StageContext";

const WordsContainer = () => {
  const { words, foundWords } = useContext(StageContext);

  return (
    <div className="words-container">
      {words.map((word, index) => {
        const showLetters = foundWords.includes(word);
        return (
          <div className="word-container" key={index}>
            {word.split("").map((letter, index) => {
              return (
                <span key={index} className="word-letter">
                  {showLetters ? letter : ""}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WordsContainer;
