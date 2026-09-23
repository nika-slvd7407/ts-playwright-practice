import { test, expect } from '@playwright/test';
import { PurchaseService } from '../src/services/PurchaseService';

test.describe('mobile purchase tests', () => {
    test('mobile user can login and add a product', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.loginAs('users.standard');

        await purchaseService.inventoryPage.addBackpackToCart();

        await purchaseService.inventoryPage.verifyCartCount('1');

        await expect(page).toHaveURL(/inventory/);
    });

    test('mobile user can add multiple products and open cart', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.loginAs('users.standard');

        await purchaseService.addProductsToCart([
            'sauce-labs-backpack',
            'sauce-labs-bike-light',
            'sauce-labs-bolt-t-shirt'
        ]);

        await purchaseService.inventoryPage.verifyCartCount('3');

        await purchaseService.openCart();

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Backpack'
        );

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Bike Light'
        );

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Bolt T-Shirt'
        );
    });

    test('mobile user can remove a product and continue checkout', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.loginAs('users.standard');

        await purchaseService.addProductsToCart([
            'sauce-labs-backpack',
            'sauce-labs-bike-light',
            'sauce-labs-bolt-t-shirt'
        ]);

        await purchaseService.openCart();

        await purchaseService.removeProduct('sauce-labs-bike-light');

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Backpack'
        );

        await purchaseService.cartPage.verifyProductIsNotInCart(
            'Sauce Labs Bike Light'
        );

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Bolt T-Shirt'
        );

        await purchaseService.checkout(
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await expect(page).toHaveURL(/checkout-step-two/);
    });

    test('mobile user can complete a multi product purchase', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.purchaseProducts(
            'users.standard',
            [
                'sauce-labs-backpack',
                'sauce-labs-bike-light',
                'sauce-labs-fleece-jacket'
            ],
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await expect(page).toHaveURL(/checkout-complete/);

        await expect(
            purchaseService.checkoutPage.confirmationHeader
        ).toHaveText('Thank you for your order!');
    });
});