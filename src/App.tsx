import { useState } from "react";
import { Game } from "./Game";
import { GetReady } from "./GetReady";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [getReady, setGetReady] = useState(false);
  const [gameResults, setGameResults] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGetReady(true);
  };

  const handleGameOver = (correctGuesses: number, incorrectGuesses: number) => {
    setGameStarted(false);
    setName("");
    setGameResults(
      `Game over! Correct guesses: ${correctGuesses}, Incorrect guesses: ${incorrectGuesses}`,
    );
  };

  const handleGameReady = () => {
    setGetReady(false);
    setGameStarted(true);
  };

  const handleReset = () => {
    setGameResults("");
    setName("");
  };

  /* Insteaf of loads of states perhaps one with an object? */

  return (
    <main className="h-full flex flex-col box-border">
      <header className="grow">
        <h1>N-Back challange</h1>
      </header>
      {!gameStarted && !gameResults && !getReady && (
        <form onSubmit={handleSubmit} className="flex flex-col text-center">
          <textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name or some other sentence"
            minLength={5}
            className="placeholder: text-center"
            required
          ></textarea>
          <button className="btn-primary mt-20" type="submit">
            Submit
          </button>
        </form>
      )}
      {gameStarted && !gameResults && (
        <Game nBack={name} handleGameOver={handleGameOver} />
      )}
      {getReady && <GetReady handleGameReady={handleGameReady} />}
      {!gameStarted && gameResults && (
        <>
          <p className="grow">{gameResults}</p>
          <button className="btn-primary w-full" onClick={handleReset}>
            Reset
          </button>
        </>
      )}
    </main>
  );
}

export default App;
