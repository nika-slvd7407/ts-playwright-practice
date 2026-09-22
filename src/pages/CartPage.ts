import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly backpackItem: Locator;
    readonly bikeLightItem: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.backpackItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' });
        this.bikeLightItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Bike Light' });
    }

    getProduct(productName: string): Locator {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: productName });
    }

    async verifyBackpackIsInCart(): Promise<void> {
        await expect(this.backpackItem).toBeVisible();
    }

    async verifyBikeLightIsInCart(): Promise<void> {
        await expect(this.bikeLightItem).toBeVisible();
    }

    async verifyProductIsInCart(productName: string): Promise<void> {
        await expect(this.getProduct(productName)).toBeVisible();
    }

    async verifyProductIsNotInCart(productName: string): Promise<void> {
        await expect(this.getProduct(productName)).toHaveCount(0);
    }

    async removeBackpack(): Promise<void> {
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    }

    async removeBikeLight(): Promise<void> {
        await this.page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    }

    async removeProduct(product: string): Promise<void> {
        await this.page.locator(`[data-test="remove-${product}"]`).click();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}