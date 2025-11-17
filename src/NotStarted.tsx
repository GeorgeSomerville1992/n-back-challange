import { useState } from "react";

export const NotStarted = ({
  handleSetGame,
}: {
  handleSetGame: (name: string) => void;
}) => {
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
