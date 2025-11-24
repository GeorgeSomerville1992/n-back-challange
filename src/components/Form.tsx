import { useState } from "react";

type NotStartedProps = {
  handleSetGame: (name: string) => void;
}

export const NotStarted = ({
  handleSetGame,
}: NotStartedProps) => {
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSetGame(name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center">
      <textarea
        value={name}
        name={"name"}
        autoComplete="given-name"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name or some other long word"
        minLength={5}
        className="placeholder: text-center"
        required
      ></textarea>
      <button className="btn-primary mt-20" type="submit">
        Submit
      </button>
    </form>
  );
};
