// basic. user sees form
// User pressens name
// user needs to add name
// user can start the game

// user sees one letter at the time
// gmae shows latter for two seconds.
// see if we can try to get this to work with setInterval
// Then the error counting etc...

// 2 back challange

// user guesses letter, if correct that letter is stored
// user guesses incorrectly, that letter is added to event handling.

import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import { userEvent } from '@testing-library/user-event';

import App from "./App";

describe("N-Back Challenge App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the form and handle user input correctly", async () => {
    render(<App />);
    // const user = userEvent.setup();

    const input = screen.getByPlaceholderText(
      "Enter your name or some other sentence",
    );
    const button = screen.getByText("Submit");

    // Check initial render
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // Simulate user input
    // await user.type(input, 'ABCDE');
    fireEvent.change(input, { target: { value: "ABCDE" } });
    expect((input as HTMLInputElement).value).toBe("ABCDE");

    // Simulate form submission
    fireEvent.click(button);

    // Wait for GetReady component to appear
    await waitFor(() => {
      expect(screen.getByText("Get Ready!")).toBeInTheDocument();
    });
  });

  it("should not start the game if no input has been given", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      "Enter your name or some other sentence",
    );
    const button = screen.getByText("Submit");

    // Simulate user input with less than 5 characters
    fireEvent.change(input, { target: { value: "" } });
    // expect((input as HTMLInputElement).value).toBe("ABCD");

    // Simulate form submission
    fireEvent.click(button);

    // Ensure GetReady component does not appear
    await waitFor(() => {
      expect(screen.queryByText("Get Ready!")).not.toBeInTheDocument();
    });
  });

  it("should start the game after the countdown", async () => {
    vi.useFakeTimers();
    render(<App />);

    const input = screen.getByPlaceholderText(
      "Enter your name or some other sentence",
    );
    const button = screen.getByText("Submit");
    // TODO use userevent
    fireEvent.change(input, { target: { value: "ABCDE" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Get Ready!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(1000);

    // // Wait for The game has started to appear
    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(900);

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(900);

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(900);

    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument();
    });
  });

  it("runs the game and handles guesses inCorrectly", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      "Enter your name or some other sentence",
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "ABCDE" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Get Ready!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByText("B")).toBeInTheDocument();
    });

    // Second letter B

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      // C should also be guessable. Need to fix?
      expect(screen.getByText("C")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText("D")).toBeInTheDocument();
      const guessButton2 = screen.getByText("Guess");
      fireEvent.click(guessButton2);
      expect(screen.getByText("Incorrect!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText("E")).toBeInTheDocument();
      const guessButton3 = screen.getByText("Guess");
      fireEvent.click(guessButton3);
      expect(screen.getByText("Incorrect!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(
        screen.getByText(/Game over! Correct guesses: 0, Incorrect guesses: 2/),
      ).toBeInTheDocument();
    });
  });

  it("runs the game and handles guesses correctly", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      "Enter your name or some other sentence",
    );
    const button = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "ABAB" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Get Ready!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(3000);

    // First letter A

    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(5000);

    // Second letter B
    await waitFor(() => {
      expect(screen.getByText("B")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByText("A")).toBeInTheDocument();
      const guessButton2 = screen.getByText("Guess");
      fireEvent.click(guessButton2);
      expect(screen.getByText("Correct!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText("B")).toBeInTheDocument();
      const guessButton3 = screen.getByText("Guess");
      fireEvent.click(guessButton3);
      expect(screen.getByText("Correct!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(
        screen.getByText(/Game over! Correct guesses: 2, Incorrect guesses: 0/),
      ).toBeInTheDocument();
    });
  });
});
