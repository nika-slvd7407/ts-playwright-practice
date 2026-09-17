import { test, expect } from '@playwright/test';

test.beforeEach('Login', async ({ page }) => {
    await page.goto('/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);
});

test('Login Test', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
});

test('Add to Cart Test', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

test('Incorrect Login', async ({ page }) => {
    await page.goto('/');

    await page.locator('#user-name').fill('meow');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});