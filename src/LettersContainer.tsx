import React, { useContext, useState } from "react";
import { StageContext } from "./StageContext";
import { throttle } from "lodash";
import { shuffleArray } from "./helpers/utils";

const LettersContainer = () => {
  const { words, foundWords, setFoundWords } = useContext(StageContext);
  const letters = words[words.length - 1].split("");

  const [possibleWord, setPossibleWord] = useState("");
  const [hoverOrder, setHoverOrder] = useState<number[]>([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [indexedLetters, setIndexedLetters] = useState(
    shuffleArray(
      letters.map((letter, index) => ({
        value: letter,
        index: index,
      }))
    )
  );

  const nrLetters = letters.length;
  let rot = 0;
  const angle = 360 / nrLetters;

  const shuffleLetters = () => {
    setIndexedLetters(shuffleArray([...indexedLetters]));
  };

  const handleMouseMove = () => {
    if (mouseDown) {
      //to be implemented, line between selected letters
    }
  };
  const throttledMouseMove = throttle(handleMouseMove, 50);

  const handleMouseUp = () => {
    if (mouseDown) {
      setMouseDown(false);
      if (words.includes(possibleWord) && !foundWords.includes(possibleWord)) {
        setFoundWords((prev) => [...prev, possibleWord]);
      }

      setPossibleWord("");
      setHoverOrder([]);
    }
  };

  const handleMouseDown = (letterIndex: number) => {
    if (!mouseDown) {
      setMouseDown(true);
      const clickedLetter = letters[letterIndex];

      setPossibleWord((prev) => prev + clickedLetter);
      setHoverOrder((prev) => [...prev, letterIndex]);
    }
  };

  const handleMouseOver = (letterIndex: number) => {
    if (mouseDown) {
      const hoveredLetter = letters[letterIndex];

      if (!hoverOrder.includes(letterIndex)) {
        setPossibleWord((prev) => prev + hoveredLetter);
        setHoverOrder((prev) => [...prev, letterIndex]);
      }

      if (hoverOrder.includes(letterIndex) && hoverOrder[hoverOrder.length - 2] === letterIndex) {
        setPossibleWord((prev) => prev.slice(0, -1));
        setHoverOrder((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    console.log(e);
    //to be implemented for mobile devices
  };

  return (
    <>
      <div className="letters-container" onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
        <span
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            height: "50px",
            color: "white",
          }}
        >
          {possibleWord.toUpperCase()}
        </span>
        <div className="letters-circle" onMouseMove={() => throttledMouseMove()} onTouchMove={handleTouchMove}>
          {indexedLetters.map((letter) => {
            const rotation = rot;
            rot = rot + angle;

            return (
              <div
                className={`dragable-letter ${hoverOrder.includes(letter.index) ? "selected-letter" : ""}`}
                key={letter.index}
                onMouseDown={() => handleMouseDown(letter.index)}
                onMouseOver={() => handleMouseOver(letter.index)}
                style={{
                  transform: `rotate(${rotation}deg) translate(80px) rotate(-${rotation}deg)`,
                }}
              >
                {letter.value.toUpperCase()}
              </div>
            );
          })}
          <div className="refresh-letters" onClick={shuffleLetters}>
            &#x21bb;
          </div>
        </div>
      </div>
    </>
  );
};

export default LettersContainer;
