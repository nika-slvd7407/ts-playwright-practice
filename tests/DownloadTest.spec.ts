import { test, expect } from '@playwright/test';
import { DownloadService } from '../src/services/DownloadService';
import { promises as fs } from 'fs';

test.describe('file download tests', () => {
    test('download pdf file', async ({ page }) => {
        const downloadService = new DownloadService(page);

        await downloadService.openDownloadSite();

        const download = await downloadService.downloadPdf();

        await downloadService.verifyDownload(download);
    });

    test('download pdf and verify file name', async ({ page }) => {
        const downloadService = new DownloadService(page);

        await downloadService.openDownloadSite();

        const download = await downloadService.downloadPdf();

        expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
        expect(await download.failure()).toBeNull();
    });

    test('download pdf save file and verify size', async ({ page }) => {
        const downloadService = new DownloadService(page);

        await downloadService.openDownloadSite();

        const download = await downloadService.downloadPdf();
        const filePath = await downloadService.saveDownload(download);

        await downloadService.verfySavedFile(filePath);

        await fs.unlink(filePath);
    });

    test('download pdf and verify download url', async ({ page }) => {
        const downloadService = new DownloadService(page);

        await downloadService.openDownloadSite();

        const download = await downloadService.downloadPdf();

        expect(download.url()).toContain('.pdf');
        expect(await download.failure()).toBeNull();
    });

    test('download pdf multiple times and verify every file', async ({ page }) => {
        const downloadService = new DownloadService(page);

        await downloadService.openDownloadSite();

        const firstDownload = await downloadService.downloadPdf();
        const secondDownload = await downloadService.downloadPdf();

        await downloadService.verifyDownload(firstDownload);
        await downloadService.verifyDownload(secondDownload);

        expect(firstDownload.suggestedFilename()).toMatch(/\.pdf$/i);
        expect(secondDownload.suggestedFilename()).toMatch(/\.pdf$/i);
    });
});