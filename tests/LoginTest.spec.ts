import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login/LoginPage';
import { getResource } from '../src/util/ResourceUtil';


test.describe('Login Tests', () => {
    test('login with standard user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.standard'),
            getResource('password')
        );


        await expect(page).toHaveURL(/inventory/);
    });

    test('login with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.lockedOut'),
            getResource('password')
        );

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });

    test('login with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('invalidUsername'),
            getResource('password')
        );

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.standard'),
            getResource('invalidPassword')
        );

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('login with empty username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login('', getResource('password'));

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        );

    });

    test('login with empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(getResource('users.standard'), '');

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Password is required'
        );
    });

    test('login with empty credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);


        await loginPage.open();
        await loginPage.login('', '');


        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        );
    });

    test('login with problem user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.problem'),
            getResource('password')
        );

        await expect(page).toHaveURL(/inventory/);
    });

    test('login with performance glitch user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.performanceGlitch'),
            getResource('password')
        );

        await expect(page).toHaveURL(/inventory/);
    });

    test('login with error user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.error'),
            getResource('password')
        );

        await expect(page).toHaveURL(/inventory/);
    });

    test('login with visual user', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.visual'),
            getResource('password')
        );

        await expect(page).toHaveURL(/inventory/);
    });
});