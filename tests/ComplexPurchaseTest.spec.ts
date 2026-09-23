import { test, expect } from '@playwright/test';
import { PurchaseService } from '../src/services/PurchaseService';

test.describe('complex purchase tests', () => {


    test('user can cancel checkout without losing cart contents', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.cancelCheckout(
            'users.standard',
            [
                'sauce-labs-backpack',
                'sauce-labs-bike-light'
            ]
        );

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Backpack'
        );

        await purchaseService.cartPage.verifyProductIsInCart(
            'Sauce Labs Bike Light'
        );
    });

    test('user can complete purchase and return to products', async ({ page }) => {
        const purchaseService = new PurchaseService(page);

        await purchaseService.purchaseAndReturnHome(
            'users.standard',
            [
                'sauce-labs-backpack',
                'sauce-labs-fleece-jacket'
            ],
            'Nika',
            'Tsalkalamanidze',
            '0100'
        );

        await expect(page).toHaveURL(/inventory/);
    });
});