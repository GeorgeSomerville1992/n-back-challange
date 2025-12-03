import { useEffect, useState } from "react";
import { shuffleArray } from "@/lib/utils";

type GameProps = {
  gameString: string;
  handleGameOver: (correctGuesses: number, incorrectGuesses: number) => void;
};

export const Game = ({ gameString, handleGameOver }: GameProps) => {
  const gameStringArray = gameString.split("");
  console.log("gameStringArray:", gameStringArray);
  const letters = shuffleArray(gameStringArray);
  console.log("Shuffled Letters:", letters);
  // const letters = gameString.split("");

  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasGuessed, setHasGuessed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLetterIndex === letters.length - 1 || incorrectGuesses > 2) {
        handleGameOver(correctGuesses, incorrectGuesses);
        clearInterval(interval);
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
    if (letters[currentLetterIndex] === letters[currentLetterIndex - 2]) {
      setCorrectGuesses(correctGuesses + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setIncorrectGuesses(incorrectGuesses + 1);
    }
    setHasGuessed(true);
  };

  const isGuessable = currentLetterIndex === null || currentLetterIndex >= 2;
  const isGuessButtonVisible = isGuessable && !hasGuessed;

  return (
    <section className="grow flex content-space flex-col">
      {currentLetterIndex !== null && currentLetterIndex < letters.length && (
        <h2 className="text-7xl flex-grow content-center">
          {letters[currentLetterIndex]}
        </h2>
      )}
      {hasGuessed && <h4>{isCorrect ? "Correct!" : "Incorrect!"}</h4>}
      {isGuessButtonVisible && (
        <button className="btn-primary" onClick={handleGuess}>
          Guess
        </button>
      )}
    </section>
  );
};
