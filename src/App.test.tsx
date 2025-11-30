import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import App from "./App";

const mocks = vi.hoisted(() => {
  return { shuffleArray: vi.fn(() => "ABEDE") };
});

vi.mock("./lib/utils", async (importActual) => {
  const actual = await importActual<typeof import("./lib/utils")>();
  return {
    ...actual,
    shuffleArray: mocks.shuffleArray,
  };
});

describe("N-Back Challenge App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      json: () => Promise.resolve({ status: "success" }),
    } as Response),
  );

  it("should not start the game if no input has been given", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter your name here");
    const button = screen.getByText("Start");

    // Simulate user input with less than 5 characters
    fireEvent.change(input, { target: { value: "" } });

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

    const input = screen.getByPlaceholderText("Enter your name here");
    const button = screen.getByText("Start");

    fireEvent.change(input, { target: { value: "ABCDE" } });
    expect((input as HTMLInputElement).value).toBe("ABCDE");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Get Ready!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(1000);

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
    const input = screen.getByPlaceholderText("Enter your name here");
    const button = screen.getByText("Start");

    fireEvent.change(input, { target: { value: "ABEDE" } });
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

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText("E")).toBeInTheDocument();
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
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(
        screen.getByText(/Game over! Correct guesses: 0, Incorrect guesses: 1/),
      ).toBeInTheDocument();
    });
  });

  it("runs the game and handles guesses correctly", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter your name here");
    const button = screen.getByText("Start");

    fireEvent.change(input, { target: { value: "ABEDE" } });
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

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByText("E")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByText("D")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByText("E")).toBeInTheDocument();

      const guessButton3 = screen.getByText("Guess");
      fireEvent.click(guessButton3);
      expect(screen.getByText("Correct!")).toBeInTheDocument();
    });

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(
        screen.getByText(/Game over! Correct guesses: 1, Incorrect guesses: 0/),
      ).toBeInTheDocument();
    });

    screen.getByRole("button", { name: "Reset" }).click();
    await waitFor(() => {
      expect(screen.getByText("Start")).toBeInTheDocument();
    });
  });
});
