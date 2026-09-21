import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly backpackItem: Locator;
    readonly bikeLightItem: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly backpackRemoveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backpackItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' });
        this.bikeLightItem = page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Bike Light' });
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    async verifyBackpackIsInCart(): Promise<void> {
        await expect(this.backpackItem).toBeVisible();
    }

    async verifyBikeLightIsInCart(): Promise<void> {
        await expect(this.bikeLightItem).toBeVisible();
    }

    async removeBackpack(): Promise<void> {
        await this.backpackRemoveButton.click();
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}