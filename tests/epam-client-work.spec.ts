import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work navigation', () => {
  test('navigates to Client Work via Services menu', async ({ page }) => {
    // Navigate to EPAM
    await page.goto('https://www.epam.com/');

    // Dismiss cookie banner if present
    const acceptBtn = page.getByRole('button', { name: /Accept All/i }).first();
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click();
    }

    // Click Services in header (use first visible)
    await page.getByRole('link', { name: 'Services' }).first().click();

    // Click Explore Our Client Work
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();

    // Assert Client Work heading is visible
    const heading = page.getByRole('heading', { name: 'Client Work' });
    await expect(heading).toBeVisible();
  });
});
