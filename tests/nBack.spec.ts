import { test, expect } from "@playwright/test";

test("Displays home page correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/n-back-challange/);

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "N-Back challenge" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
});
// use it as a user would!
test("Starts the game", async ({ page }) => {
  // use clock?
  await page.goto("http://localhost:5173/");
  await page.clock.install();

  await expect(page.getByRole("button", { name: "Start" })).toBeVisible();
  // unlikely we can mock the randomization function with playwright
  await page.getByRole("textbox", { name: "name" }).fill("EEEEE");
  await page.getByRole("button", { name: "Start" }).click();

  await expect(page.getByRole("heading", { name: /3/ })).toBeVisible();

  // Wait for 1 second and assert the countdown is "2"
  page.clock.fastForward(1000);
  await expect(page.getByRole("heading", { name: /2/ })).toBeVisible();

  // Wait for another second and assert the countdown is "1"
  page.clock.fastForward(1000);
  await expect(page.getByRole("heading", { name: /1/ })).toBeVisible();

  // page.clock.fastForward(1000);

  // await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  // page.clock.fastForward(1000);

  // await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  // page.clock.fastForward(1000);

  // await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  // const guessButton = page.getByRole("button", { name: "Guess" });
  // await expect(guessButton).toBeVisible();
  // await guessButton.click();

  // await page.getByRole("button", { name: "Guess" }).click();
  // await expect(page.getByRole("heading", { name: /Correct!/ })).toBeVisible();

  // // page.clock.fastForward(4000);
  // // not working...
  // // await expect(page.getByRole("paragraph", { name: 'Game over! Correct guesses' })).toBeVisible();

  // await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
});

test("Guess incorrectly and ends game", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.clock.install();

  // how would we simulate a random non-matching letter sequence?
  await page.getByRole("textbox", { name: "name" }).fill("EEEEE");
  await page.getByRole("button", { name: "Start" }).click();

  page.clock.fastForward(3000);

  await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  page.clock.fastForward(1000);

  await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  page.clock.fastForward(1000);

  await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  const guessButton = page.getByRole("button", { name: "Guess" });
  await expect(guessButton).toBeVisible();
  await guessButton.click();

  page.clock.fastForward(2000);
  await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  await page.getByRole("button", { name: "Guess" }).click(); // correct

  page.clock.fastForward(2000);
  await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
  await page.getByRole("button", { name: "Guess" }).click(); // correct

  await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();

//   page.clock.fastForward(2000);
//   await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
//   await page.getByRole("button", { name: "Guess" }).click(); // correct

//   page.clock.fastForward(2000);
//   await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
//   await page.getByRole("button", { name: "Guess" }).click(); // correct

//   page.clock.fastForward(2000);
//   await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
//   await page.getByRole("button", { name: "Guess" }).click(); // correct

//   page.clock.fastForward(2000);
//   await expect(page.getByRole("heading", { name: /E/ })).toBeVisible();
//   await page.getByRole("button", { name: "Guess" }).click(); // correct
});