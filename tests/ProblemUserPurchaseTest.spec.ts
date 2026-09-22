import { test, expect } from '@playwright/test';
import { PurchaseService } from '../src/services/PurchaseService';

test.describe('standard user purchase tests', () => {
    test('standard user can purchase multiple products', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.purchaseProducts(
            'users.standard',
            [
                'sauce-labs-backpack',
                'sauce-labs-bike-light',
                'sauce-labs-bolt-t-shirt'
            ],
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await expect(page).toHaveURL(/checkout-complete/);
    });

    test('standard user can remove a product before checkout', async ({ page }) => {
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

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Bolt T-Shirt'
        );

        await purchaseService.cartPage.verifyProductIsNotInCart(
            'Sauce Labs Bike Light'
        );

        await purchaseService.checkout(
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await expect(page).toHaveURL(/checkout-step-two/);
    });
});