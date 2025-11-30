import { useState } from "react";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type NotStartedProps = {
  handleSetGame: (name: string) => void;
};

export const NotStarted = ({ handleSetGame }: NotStartedProps) => {
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSetGame(name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center form">
      <FieldSet>
        <FieldGroup>
          <FieldLabel htmlFor="feedback">Please enter your name</FieldLabel>
          <Textarea
            id="name"
            rows={4}
            value={name}
            name="name"
            autoComplete="given-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name here"
            minLength={5}
            required
          />
        </FieldGroup>
      </FieldSet>
      <Button
        variant="outline"
        type="submit"
        className="mt-5 block w-50 self-center btn-primary"
      >
        Start
      </Button>
    </form>
  );
};
