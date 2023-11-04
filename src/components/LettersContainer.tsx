import React, { RefObject, useContext, useEffect, useRef, useState } from "react";
import { StageContext } from "../context/StageContext";
import { throttle } from "lodash";
import { shuffleArray } from "../helpers/utils";

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
  const [letterBoxes, setLetterBoxes] = useState<{ [key: number]: { x: number; y: number } }>({});

  const lettersRef = useRef<RefObject<HTMLDivElement>[]>(
    Array.from({ length: letters.length }, () => React.createRef())
  );

  useEffect(() => {
    lettersRef.current.forEach((letterBox, index) => {
      if (letterBox.current) {
        const boxRect = letterBox.current.getBoundingClientRect();

        setLetterBoxes((prev) => ({ ...prev, [index]: { x: boxRect.x, y: boxRect.y } }));
      }
    });
  }, [indexedLetters]);

  const nrLetters = letters.length;
  let rot = 0;
  const angle = 360 / nrLetters;

  const shuffleLetters = () => {
    setIndexedLetters(shuffleArray([...indexedLetters]));
  };

  const checkPossibleWord = () => {
    if (words.includes(possibleWord) && !foundWords.includes(possibleWord)) {
      setFoundWords((prev) => [...prev, possibleWord]);
    }

    setPossibleWord("");
    setHoverOrder([]);
  };

  const markFirstPossibleLetter = (letterIndex: number) => {
    const clickedLetter = letters[letterIndex];

    setPossibleWord((prev) => prev + clickedLetter);
    setHoverOrder((prev) => [...prev, letterIndex]);
  };

  const markHoveredPossibleLetter = (letterIndex: number) => {
    const hoveredLetter = letters[letterIndex];

    if (!hoverOrder.includes(letterIndex)) {
      setPossibleWord((prev) => prev + hoveredLetter);
      setHoverOrder((prev) => [...prev, letterIndex]);
    }

    if (hoverOrder.includes(letterIndex) && hoverOrder[hoverOrder.length - 2] === letterIndex) {
      setPossibleWord((prev) => prev.slice(0, -1));
      setHoverOrder((prev) => prev.slice(0, -1));
    }
  };

  const handleMouseMove = () => {
    if (mouseDown) {
      //to be implemented, line between selected letters
    }
  };
  const throttledMouseMove = throttle(handleMouseMove, 50);

  /**
   * When user clicks up or remove finger from screen
   * Check the formed word between stage words
   */
  const handleMouseUp = () => {
    if (mouseDown) {
      setMouseDown(false);
      checkPossibleWord();
    }
  };
  const handleTouchEnd = () => {
    checkPossibleWord();
  };

  const handleMouseDown = (letterIndex: number) => {
    if (!mouseDown) {
      setMouseDown(true);
      markFirstPossibleLetter(letterIndex);
    }
  };
  const handleTouchStart = (letterIndex: number) => {
    markFirstPossibleLetter(letterIndex);
  };

  const handleMouseOver = (letterIndex: number) => {
    if (mouseDown) {
      markHoveredPossibleLetter(letterIndex);
    }
  };

  const boxRange = 45;
  /**
   * Get X and Y of touch move and compare it with positions of saved boxes
   */
  const handleTouchMove = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    Object.entries(letterBoxes).forEach((item) => {
      const index = parseInt(item[0]);
      const letterBox = item[1];
      if (
        touchX > letterBox.x &&
        touchX < letterBox.x + boxRange &&
        touchY > letterBox.y &&
        touchY < letterBox.y + boxRange
      ) {
        markHoveredPossibleLetter(index);

        return;
      }
    });
  };
  const throttledTouchMove = throttle(handleTouchMove, 50);

  return (
    <>
      <div
        className="letters-container"
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
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
        <div
          className="letters-circle"
          onMouseMove={() => throttledMouseMove()}
          onTouchMove={(e) => throttledTouchMove(e)}
        >
          {indexedLetters.map((letter) => {
            const rotation = rot;
            rot = rot + angle;

            return (
              <div
                className={`dragable-letter ${hoverOrder.includes(letter.index) ? "selected-letter" : ""}`}
                key={letter.index}
                ref={lettersRef.current[letter.index]}
                onMouseDown={() => handleMouseDown(letter.index)}
                onMouseOver={() => handleMouseOver(letter.index)}
                onTouchStart={() => handleTouchStart(letter.index)}
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
