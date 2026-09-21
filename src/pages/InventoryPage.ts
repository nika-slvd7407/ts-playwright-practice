import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly backpackAddButton: Locator;
    readonly bikeLightAddButton: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.bikeLightAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addBackpackToCart(): Promise<void> {
        await this.backpackAddButton.click();
    }

    async addBikeLightToCart(): Promise<void> {
        await this.bikeLightAddButton.click();
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async verifyCartCount(count: string): Promise<void> {
        await expect(this.cartBadge).toHaveText(count);
    }
}