import { useState, useEffect } from "react";
import { Game } from "./components/Game";
import { CountDown } from "./components/CountDown";
import { NotStarted } from "./components/Form";
import { sendEvent } from "./server/api";
import Toastify from "toastify-js";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [gameResults, setGameResults] = useState("");
  const [gameStateKey, setGameStateKey] =
    useState<keyof typeof gameState>("notStarted");

  const handleSetGame = (name: string) => {
    setName(name);
    setGameStateKey("countDown");
  };

  const handleGameOver = (correctGuesses: number, incorrectGuesses: number) => {
    setGameResults(
      `Game over! Correct guesses: ${correctGuesses}, Incorrect guesses: ${incorrectGuesses}`,
    );

    setGameStateKey("finished");
  };

  const handleGameReady = () => {
    setGameStateKey("started");
  };

  const handleReset = () => {
    setGameStateKey("notStarted");
  };

  useEffect(() => {
    if (gameStateKey !== "notStarted") {
      sendEvent(`Game state changed to: ${gameStateKey}`);
      Toastify({
        text: `Game state changed to: ${gameStateKey}`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
  }, [gameStateKey]);

  const gameState = {
    notStarted: <NotStarted handleSetGame={handleSetGame} />,
    countDown: <CountDown handleGameReady={handleGameReady} />,
    started: <Game gameString={name} handleGameOver={handleGameOver} />,
    finished: (
      <>
        <p className="grow">{gameResults}</p>
        <button className="btn-primary w-full" onClick={handleReset}>
          Reset
        </button>
      </>
    ),
  };

  return (
    <main className="h-full flex flex-col box-border">
      <header className="grow">
        <h1 className="text-7xl">N-Back challenge</h1>
      </header>
      {gameState[gameStateKey]}
    </main>
  );
}

export default App;
