import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

export abstract class BaseService {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}