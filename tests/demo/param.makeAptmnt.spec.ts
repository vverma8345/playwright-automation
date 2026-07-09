import { test, expect } from '@playwright/test';
import TestData from "../../data/test-data.js";

const makeApptTestData = TestData.makeAppoinmentTestData(); // -> returns 3 objests test data

//Access the test data
for (const apptData of makeApptTestData) {
    test.describe('Make Appointment', () => {

        test.beforeEach('Login with valid creds', async ({ page },testInfo) => {
            //1. Launch application and make assert title and header    
            //await page.goto("https://katalon-demo-cura.herokuapp.com/");
            
            // Get the url from config file
           const envConfig =  testInfo.project.use as any;
            await page.goto(envConfig.appUrl);
            await expect(page).toHaveTitle("CURA Healthcare Service");
            await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

            //2. Click on make appoinment
            await page.getByRole("link", { name: "Make Appointment" }).click();
            await expect(page.getByText("Please login to make appointment.")).toBeVisible();

            //3. Login successfully
            await page.getByLabel("username").fill("John Doe");
            await page.getByLabel("Password").fill("ThisIsNotAPassword");
            await page.getByRole("button", { name: "Login" }).click();

            //get login cookies
           const loginCookies =  await page.context().cookies();
           process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

            //4. Assert to text
            await expect(page.locator("h2")).toContainText("Make Appointment");



        })

        test(`${apptData.testId}: Should make appointment with non-default values`, async ({ page }) => {


            //access the login cookies
            console.log(`>>> login cookies: ${process.env.LOGIN_COOKIES}`)

            //dropdown
            await page.getByLabel('Facility').selectOption(apptData.facility);
            //checkbox
            await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
            //radio button
            await page.getByRole('radio', { name: apptData.hcp }).check();
            // date field
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill(apptData.visitDt);
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');
            await page.getByRole('textbox', { name: 'Comment' }).click();
            //mulltiline textbox
            await page.getByRole('textbox', { name: 'Comment' }).fill('This is multiline comment !');
            //button
            await page.getByRole('button', { name: 'Book Appointment' }).click();
            //assertion
            await expect(page.locator('h2')).toContainText('Appointment Confirmation');
            await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();

        });

    })

}


