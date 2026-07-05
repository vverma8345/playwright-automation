import { test, expect, devices } from '@playwright/test'

test("Should load the home page with correct title",{annotation:{type:"Bug",description:"JIRA-123: not working in firefox."}}, async ({ page , browserName}) => {

    test.skip(browserName === 'firefox','Open bug defect id : 1244');

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

});

test('Should demo config file', { tag: "@smoke" }, async ({ page }, testInfo) => {

    console.log(`>> config at run-time: ${JSON.stringify(testInfo.config)}`)
})

test('Should demo fixtures', { tag: "@smoke" }, async ({ page,browserName }, testInfo) => {

    //timeouts
    // test.slow();
    //test.setTimeout(120_000);
      console.log(`>> Browser name: ${browserName}`);
})

test.only('Should demo devices', async ({  }) => {

      console.log(`>> Browser name: ${Object.keys(devices)}`);
})

