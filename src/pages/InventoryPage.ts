import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async addBackpackToCart(): Promise<void> {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async addBikeLightToCart(): Promise<void> {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    }

    async addBoltTShirtToCart(): Promise<void> {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    }

    async addFleeceJacketToCart(): Promise<void> {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    }

    async addOnesieToCart(): Promise<void> {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    }

    async addProductToCart(product: string): Promise<void> {
        await this.page.locator(`[data-test="add-to-cart-${product}"]`).click();
    }

    async verifyCartCount(count: string): Promise<void> {
        await expect(this.cartBadge).toHaveText(count);
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}