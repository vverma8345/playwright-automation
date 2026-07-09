import {expect, type Locator, type Page} from '@playwright/test';
import {log} from '../helpers/logger';

export default class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    log('info', `Navigating to the ${url}`);
    await this.page.goto(url);
  }

  async getElement(locator: string): Promise<Locator> {
    try {
      log('info', `Getting element with locator: ${locator}`);
      return this.page.locator(locator);
    } catch (error) {
      log('error', `Error occurred while getting element with locator: ${locator}`);
      throw error;
    }
  }

  async clickElement(locator: string) {
    try {
      log('info', `Clicking element with locator: ${locator}`);
      const element = await this.getElement(locator);
      await element.click();
    } catch (error) {
      log('error', `Error occurred while clicking element with locator: ${locator}`);
      throw error;
    }
  }

  async typeText(locator: string, text: string) {
    try {
      log('info', `Typing text "${text}" into element with locator: ${locator}`);
      await expect(this.page.locator(locator)).toBeVisible({timeout: 5000});
      const element = await this.getElement(locator);
      await element.fill(text);
    } catch (error) {
      log('error', `Error occurred while typing text into element with locator: ${locator}`);
      throw error;
    }
  }

  async getText(locator: string): Promise<string> {
    try {
      log('info', `Getting text from element with locator: ${locator}`);
      await expect(this.page.locator(locator)).toBeVisible({timeout: 5000});
      const element = await this.getElement(locator);
      return element.textContent() || '';
    } catch (error) {
      log('error', `Error occurred while getting text from element with locator: ${locator}`);
      throw error;
    }
  }

  async expectText(locator: string, expectedText: string) {
    try {
      log('info', `Expecting text "${expectedText}" in element with locator: ${locator}`);
      await expect(this.page.locator(locator)).toBeVisible({timeout: 5000});
      const actualText = await this.getText(locator);
      expect(actualText).toBe(expectedText);
    } catch (error) {
      log('error', `Error occurred while expecting text in element with locator: ${locator}`);
      throw error;
    }
  }
}   

