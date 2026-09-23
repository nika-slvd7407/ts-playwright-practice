import { Locator, Page } from '@playwright/test';

export class PlayLabDownloadPage {
    readonly page: Page;
    readonly downloadPdfLink: Locator;
    readonly openPdfLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.downloadPdfLink = page.getByRole('link', { name: 'Download PDF' });
        this.openPdfLink = page.getByText('Open PDF');
    }

    async open(): Promise<void> {
        await this.page.goto('https://playwrightlab.github.io/');
    }

    async startPdfDownload(): Promise<import('@playwright/test').Download> {
        const downlaodPromise = this.page.waitForEvent('download');

        await this.downloadPdfLink.click();

        return await downlaodPromise;
    }

    async openPdf(): Promise<void> {
        await this.openPdfLink.click();
    }
}