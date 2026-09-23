import { expect, Page } from '@playwright/test';
import { promises as fs } from 'fs';
import { BaseService } from './BaseService';
import { PlayLabDownloadPage } from '../pages/PlayLabDownloadPage';

export class DownloadService extends BaseService {
    readonly playLabDownloadPage: PlayLabDownloadPage;

    constructor(page: Page) {
        super(page);
        this.playLabDownloadPage = new PlayLabDownloadPage(page);
    }

    async openDownloadSite(): Promise<void> {
        await this.playLabDownloadPage.open();
    }

    async downloadPdf(): Promise<import('@playwright/test').Download> {
        return await this.playLabDownloadPage.startPdfDownload();
    }

    async verifyDownload(download: import('@playwright/test').Download): Promise<void> {
        const filname = download.suggestedFilename();
        const filePath = await download.path();

        expect(filname).toMatch(/\.pdf$/i);
        expect(filePath).toBeTruthy();

        const stats = await fs.stat(filePath!);

        expect(stats.size).toBeGreaterThan(0);
    }

    async saveDownload(download: import('@playwright/test').Download): Promise<string> {
        const fileName = download.suggestedFilename();
        const filePath = `test-results/${fileName}`;

        await fs.mkdir('test-results', { recursive: true });
        await download.saveAs(filePath);

        return filePath;
    }

    async verfySavedFile(filePath: string): Promise<void> {
        const stats = await fs.stat(filePath);

        expect(stats.size).toBeGreaterThan(0);
    }

    async verifyDownloadFailure(download: import('@playwright/test').Download): Promise<void> {
        expect(await download.failure()).toBeNull();
    }
}