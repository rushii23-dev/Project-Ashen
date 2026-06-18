import { test, expect } from '@playwright/test';

test('Carbon Calculator full flow', async ({ page }) => {
  // Go to root page and navigate to calculator
  await page.goto('http://localhost:5173/');

  // Need to scroll or just wait for element to be visible if it's dynamic
  await page.waitForSelector('#carbon-calculator', { state: 'attached' });

  // Step 1
  await page.getByRole('button', { name: 'Personal Car or Bike' }).click();

  // Step 2
  await page.getByRole('button', { name: 'Meat Every Day' }).click();

  // Step 3
  await page.getByRole('button', { name: 'Often. I like buying new trends.' }).click();

  // Verify Result Screen
  await expect(page.getByText('TONS', { exact: false })).toBeVisible();
  await expect(page.getByText('Your annual carbon exhaust.')).toBeVisible();
});
