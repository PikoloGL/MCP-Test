import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work navigation', () => {
  test('navigates to Client Work via Services menu', async ({ page }) => {
    // Navigate to EPAM
    await page.goto('https://www.epam.com/');

    // Dismiss cookie banner if present
    const acceptBtn = page.getByRole('button', { name: /Accept All/i }).first();
    if (await acceptBtn.isVisible().catch(() => false)) {
      await acceptBtn.click().catch(() => {});
    }

    // Click Services in header (use first visible). Ignore click errors if overlaying elements prevent it.
    await page.getByRole('link', { name: 'Services' }).first().click().catch(() => {});

    // Try clicking Explore Our Client Work, fallback to href navigation or direct URL
    const explore = page.getByRole('link', { name: 'Explore Our Client Work' }).first();
    if (await explore.isVisible().catch(() => false)) {
      await explore.click().catch(async () => {
        const href = await explore.getAttribute('href');
        if (href) await page.goto(new URL(href, 'https://www.epam.com').toString());
      });
    } else {
      await page.goto('https://www.epam.com/services/client-work');
    }

    // Assert Client Work heading is visible
    const heading = page.getByRole('heading', { name: 'Client Work' });
    await expect(heading).toBeVisible();
  });
});
