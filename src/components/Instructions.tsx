export const Instructions = () => {
  return (
    <section className="instructions">
      <p>
        This is a small Memory Game. You will be shown a series of letters one
        after the other. If the current letter you are seeing, is the same as
        the one you saw <b>2 letters ago</b> then click the guess button.
      </p>
      <p>
        The game will end either at the end of the sequence or after 2 incorrect
        answers
      </p>
    </section>
  );
};
