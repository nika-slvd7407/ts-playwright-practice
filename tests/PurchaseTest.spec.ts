import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { getResource } from '../src/util/ResourceUtil';

test.describe('purchase tests', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            getResource('users.standard'),
            getResource('password')
        );

        await expect(page).toHaveURL(/inventory/);
    });

    test('add a product to the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();

        await inventoryPage.verifyCartCount('1');
    });

    test('add multiple products to the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.addBikeLightToCart();

        await inventoryPage.verifyCartCount('2');

        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.verifyBackpackIsInCart();
        await cartPage.verifyBikeLightIsInCart();
    });

    test('remove a product from the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.addBikeLightToCart();
        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.removeBackpack();

        await expect(cartPage.backpackItem).toHaveCount(0);
        await cartPage.verifyBikeLightIsInCart();
    });

    test('complete a purchase successfully', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.verifyBackpackIsInCart();
        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCheckoutDetails(
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await checkoutPage.continueToOverview();

        await expect(page).toHaveURL(/checkout-step-two/);
        await expect(page.locator('[data-test="inventory-item"]'))
            .toContainText('Sauce Labs Backpack');

        await checkoutPage.finishPurchase();
        await checkoutPage.verifyOrderConfirmation();
    });

    test('checkout requires a first name', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCheckoutDetails('', 'smth', '0100');
        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toHaveText(
            'Error: First Name is required'
        );
    });

    test('checkout requires a last name', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCheckoutDetails('Nika', '', '0100');
        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toHaveText(
            'Error: Last Name is required'
        );
    });

    test('checkout requires a postal code', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.enterCheckoutDetails('Nika', 'smth', '');
        await checkoutPage.continueToOverview();

        await expect(checkoutPage.errorMessage).toHaveText(
            'Error: Postal Code is required'
        );
    });

    test('cancel checkout and return to the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.addBackpackToCart();
        await inventoryPage.openCart();

        const cartPage = new CartPage(page);

        await cartPage.proceedToCheckout();

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.cancelButton.click();

        await expect(page).toHaveURL(/cart/);
        await cartPage.verifyBackpackIsInCart();
    });
});