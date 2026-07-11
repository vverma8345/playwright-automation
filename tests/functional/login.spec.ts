import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config';

test.describe("Login Functionality",{annotation:{type:"Story",description:"JIRA-123: Make Appointment"},tag:"@smoke"}, () => {

    test.beforeEach("Go to login page", async ({ page },testInfo) => {

        //1. Launch application and make assert title and header    
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        //2. Click on make appoinment
        await page.getByRole("link", { name: "Make Appointment" }).click();
        
        //time out at step level
        await expect(page.getByText("Please login to make appointment.")).toBeVisible({timeout:10_000});

    });

    test("Should login successfully", async ({ page }, testInfo) => {



        //3. Login successfully
        await page.getByLabel("username").fill(process.env.TEST_USER_NAME);
        await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
        await page.getByRole("button", { name: "Login" }).click();

        /**
         *  Add custom screenshots at test level scope
         * @TODO: add this a helper function
         */

        let fullPage = await page.screenshot({ fullPage: true });
        await testInfo.attach("login page", { body: fullPage, contentType: "image/png" });

        //4. Assert to text
        await expect(page.locator("h2")).toContainText("Make Appointment");



    });

    test("Should prevent login with incorrect creds", async ({ page }) => {


        //3. login unsuccessfull

        await page.getByLabel("username").fill("John Smith");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        //4. Assert to error message
        await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.'); await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');




    });



});

