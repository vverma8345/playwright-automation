import { test, expect, devices } from '@playwright/test'
import constants from "../../data/constants.json"
import { log } from '../helpers/logger';

test("Should load the home page with correct title", { annotation: { type: "Bug", description: "JIRA-123: not working in firefox." } }, async ({ page, browserName }) => {

    test.skip(browserName === 'firefox', 'Open bug defect id : 1244');

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

});

test('Should demo config file', { tag: "@smoke" }, async ({ page }, testInfo) => {

    console.log(`>> config at run-time: ${JSON.stringify(testInfo.config)}`)
})

test('Should demo fixtures', { tag: "@smoke" }, async ({ page, browserName }, testInfo) => {

    //timeouts
    // test.slow();
    //test.setTimeout(120_000);
    console.log(`>> Browser name: ${browserName}`);
})

test('Should demo devices', async () => {

    console.log(`>> Browser name: ${Object.keys(devices)}`);
})

//data handinling by constants.json file
test('Should demo constant data', async () => {

    console.log(`>> Constant Data: ${JSON.stringify(constants.STATUSCODES)}`)

})

//using base page object
test('Should demo base page object', async ({ page }) => {

    // base page object
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    const ele = await page.locator("//a[@id='btn-make-appointment']");

    try {
        log('info', `Clicking element with locator: ${ele}`);
        await expect(ele).toBeVisible({ timeout: 10_000 });
        await ele.click(); 
    } catch (error) {
        await log('error', `Error occurred ${error} while clicking element with locator: ${ele.toString}`);
        throw error;
    }

})

