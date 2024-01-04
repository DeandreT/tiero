import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('new tier top', async ({ page }) => {
  await page.goto('http://localhost:5173/new-tier-list');
  await page.getByRole('button', { name: 'Add Tier Top' }).click();
  await expect(page.getByRole('textbox').first()).toHaveValue('New Tier');
});

test('new tier bottom', async ({ page }) => {
  await page.goto('http://localhost:5173/new-tier-list');
  await page.getByRole('button', { name: 'Add Tier Bottom' }).click();
  await expect(page.getByRole('textbox').last()).toHaveValue('New Tier');
});

test('remove tier top', async ({ page }) => {
  await page.goto('http://localhost:5173/new-tier-list');
  await page.getByRole('button', { name: 'Remove Tier Top' }).click();
  await expect(page.getByRole('textbox')).toHaveValue('Tier2');
});

test('remove tier bottom', async ({ page }) => {
  await page.goto('http://localhost:5173/new-tier-list');
  await page.getByRole('button', { name: 'Remove Tier Bottom' }).click();
  await expect(page.getByRole('textbox')).toHaveValue('Tier1');
});