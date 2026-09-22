import { test, expect } from '@playwright/test';
import { PurchaseService } from '../src/services/PurchaseService';

test.describe('performance glitch user purchase tests', () => {
    test('performance glitch user can complete a full purchase', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.purchaseProducts(
            'users.performanceGlitch',
            [
                'sauce-labs-fleece-jacket',
                'sauce-labs-onesie'
            ],
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await expect(page).toHaveURL(/checkout-complete/);
    });

    test('performance glitch user can cancel checkout', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.startCheckout(
            'users.performanceGlitch',
            [
                'sauce-labs-fleece-jacket',
                'sauce-labs-backpack'
            ]
        );

        await purchaseService.checkoutPage.cancelButton.click();

        await expect(page).toHaveURL(/cart/);

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Fleece Jacket'
        );

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Backpack'
        );
    });
});