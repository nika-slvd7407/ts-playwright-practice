import { expect, Page } from '@playwright/test';
import { BaseService } from './BaseService';
import { getResource } from '../util/ResourceUtil';

export class PurchaseService extends BaseService {
    constructor(page: Page) {
        super(page);
    }

    async loginAs(username: string): Promise<void> {
        await this.loginPage.open();

        await this.loginPage.login(
            getResource(username),
            getResource('password')
        );

        await expect(this.page).toHaveURL(/inventory/);
    }

    async addProductsToCart(products: string[]): Promise<void> {
        for (const product of products) {
            await this.inventoryPage.addProductToCart(product);
        }
    }

    async openCart(): Promise<void> {
        await this.inventoryPage.openCart();
    }

    async removeProduct(product: string): Promise<void> {
        await this.cartPage.removeProduct(product);
    }

    async checkout(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.cartPage.proceedToCheckout();

        await this.checkoutPage.enterCheckoutDetails(
            firstName,
            lastName,
            postalCode
        );

        await this.checkoutPage.continueToOverview();
    }

    async completePurchase(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.checkout(
            firstName,
            lastName,
            postalCode
        );

        await this.checkoutPage.finishPurchase();
        await this.checkoutPage.verifyOrderConfirmation();
    }

    async purchaseProducts(username: string, products: string[], firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.loginAs(username);
        await this.addProductsToCart(products);
        await this.openCart();
        await this.completePurchase(firstName, lastName, postalCode);
    }

    async startCheckout(username: string, products: string[]): Promise<void> {
        await this.loginAs(username);
        await this.addProductsToCart(products);
        await this.openCart();
        await this.cartPage.proceedToCheckout();
    }
    
    async purchaseAndReturnHome(username: string, products: string[], firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.purchaseProducts(
        username,
        products,
        firstName,
        lastName,
        postalCode
    );

    await this.checkoutPage.returnToProducts();
}

async addRemoveAndCheckout(username: string, products: string[], productToRemove: string, firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.loginAs(username);
    await this.addProductsToCart(products);
    await this.openCart();
    await this.removeProduct(productToRemove);
    await this.checkout(firstName, lastName, postalCode);
}

async cancelCheckout(username: string, products: string[]): Promise<void> {
    await this.startCheckout(username, products);
    await this.checkoutPage.cancelButton.click();
    await expect(this.page).toHaveURL(/cart/);
}
}