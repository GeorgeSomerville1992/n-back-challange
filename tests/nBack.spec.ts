import { test, expect } from '@playwright/test';

// test('Displays home page correctly', async ({ page }) => {
//   await page.goto('http://localhost:5173/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/n-back-challange/);

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'N-Back challenge' })).toBeVisible();
//   await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
// }); 

test('Starts the game', async ({ page }) => {
  // use clock?
  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
  await page.getByRole('textbox', { name: 'name' }).fill('ABEDE'); 
  await page.getByRole('button', { name: 'Start' }).click();

    // Assert the countdown starts at "3"
  await expect(page.getByRole('heading', { name: /3/ })).toBeVisible();

  // Wait for 1 second and assert the countdown is "2"
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: /2/ })).toBeVisible();

  // Wait for another second and assert the countdown is "1"
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: /1/ })).toBeVisible();
    // wait for text to change?

    // asses based on buttonsd
}); 
