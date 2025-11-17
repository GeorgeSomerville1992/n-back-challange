import { useState, useEffect } from "react";
import { Game } from "./Game";
import { GetReady } from "./GetReady";
import { NotStarted } from "./NotStarted";
import { sendEvent } from "./server/api";
import { Notification } from "./Notification";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [gameResults, setGameResults] = useState("");
  const [gameStateKey, setGameStateKey] =
    useState<keyof typeof gameState>("notStarted");
  const [notification, setNotification] = useState("");

  const handleSetGame = (name: string) => {
    setName(name);
    setGameStateKey("getReady");
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
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (gameStateKey && gameStateKey !== "notStarted") {
      sendEvent(`Game state changed to: ${gameStateKey}`);
      setNotification(`Game state changed to: ${gameStateKey}`);
    }
  }, [gameStateKey]);

  const gameState = {
    notStarted: () => <NotStarted handleSetGame={handleSetGame} />,
    getReady: () => <GetReady handleGameReady={handleGameReady} />,
    started: () => <Game nBack={name} handleGameOver={handleGameOver} />,
    finished: () => (
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
        <h1 className="text-7xl">N-Back challange</h1>
      </header>
      {notification && <Notification notification={notification} />}
      {gameState[gameStateKey]()}
    </main>
  );
}

export default App;
