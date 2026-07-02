import { test, expect } from '@playwright/test'

test("Should load the home page with correct title",async({page})=>{
   
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

});

/**
 * 
 * test('Test 1',{tag:"@smoke"},async({page},testInfo) =>{

    await page.locator("//h1").click();

   })
 * 
 * 
 */
