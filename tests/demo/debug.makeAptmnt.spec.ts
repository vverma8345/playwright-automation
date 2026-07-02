import { test, expect } from '@playwright/test';

test.describe('Make Appointment', () => {

    test.beforeEach('Login with valid creds', async ({ page }) => {
        //1. Launch application and make assert title and header    
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        //2. Click on make appoinment
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await expect(page.getByText("Please login to make appointment.")).toBeVisible();

        //3. Login successfully
        await page.getByLabel("username").fill("John Doe");
        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        //4. Assert to text
        await expect(page.locator("h2")).toContainText("Make Appointment");



    })

    test('Should make appointment with non-default values', async ({ page }) => {

        //dropdown
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
        //checkbox
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        //radio button
        await page.getByRole('radio', { name: 'Medicaid' }).check();

        //debug
        await page.pause(); 
        
        // date field
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('01/07/2027');
       // await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');
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
