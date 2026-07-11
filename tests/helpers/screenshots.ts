import { test, type Page, type Locator } from '@playwright/test';
async function takeFullPageScreenshot(page: Page, screenshotName: string){
  const screenshot = await page.screenshot({fullPage: true});
  await test.info().attach(screenshotName, {
    body: screenshot,
    contentType: 'image/png',
  });
  
}

async function takeElementScreenshot(element: Locator, screenshotName: string){
  const screenshot = await element.screenshot();
  await test.info().attach(screenshotName, {
    body: screenshot,
    contentType: 'image/png',
  });
}

export default { takeFullPageScreenshot, takeElementScreenshot };