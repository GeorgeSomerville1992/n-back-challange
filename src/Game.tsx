import { useEffect, useState } from "react";

type GameProps = {
  nBack: string;
  handleGameOver: (correctGuesses: number, incorrectGuesses: number) => void;
};

export const Game = ({ nBack, handleGameOver }: GameProps) => {
  // on render it sets a timer that shows one letter at the time

  const letters = nBack.split("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLetterIndex === letters.length - 1 || incorrectGuesses > 2) {
        handleGameOver(correctGuesses, incorrectGuesses);
        clearInterval(interval); // stop the interval
      }

      setCurrentLetterIndex(currentLetterIndex + 1);
      setHasGuessed(false);
    }, 2000);
    return () => clearInterval(interval);
  }, [
    correctGuesses,
    currentLetterIndex,
    handleGameOver,
    incorrectGuesses,
    letters.length,
  ]);

  const handleGuess = () => {
    // simulate some sort of event api ===
    // what happened and when
    if (letters[currentLetterIndex] === letters[currentLetterIndex - 2]) {
      // handle correct guess logic here
      setCorrectGuesses(correctGuesses + 1);
      setIsCorrect(true);

      // what if they press correctly multiple times?
      // debounce - (you clicked ot many times man)
    } else {
      setIsCorrect(false);
      setIncorrectGuesses(incorrectGuesses + 1);
      // handle incorrect guess logic here
    }
    setHasGuessed(true);
  };

  const isGuessable = currentLetterIndex === null || currentLetterIndex >= 2;
  const isGuessButtonVisible = isGuessable && !hasGuessed;

  return (
    <section className="grow flex content-space justify-between flex-col">
      {currentLetterIndex !== null && currentLetterIndex < letters.length && (
        <span className="text-5xl">{letters[currentLetterIndex]}</span>
      )}
      {hasGuessed && <div>{isCorrect ? "Correct!" : "Incorrect!"}</div>}
      {isGuessButtonVisible && (
        <button className="btn-primary" onClick={handleGuess}>
          Guess
        </button>
      )}
    </section>
  );
};

//  {currentLetterIndex !== null && currentLetterIndex < letters.length ? (
//     <span className="text-5xl">{letters[currentLetterIndex]}</span>
//   ) : (
//     <span className="text-2xl">Get ready...</span>
//   )}
