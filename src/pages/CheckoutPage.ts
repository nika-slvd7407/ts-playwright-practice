import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly finishButton: Locator;
    readonly confirmationHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async enterCheckoutDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();
    }

    async finishPurchase(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderConfirmation(): Promise<void> {
        await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    }

    async returnToProducts(): Promise<void> {
        await this.backHomeButton.click();
    }
}