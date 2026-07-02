import { test, expect } from '@playwright/test';

test.describe('Make Appointment', () => {

    test.beforeEach('Login with valid creds', async ({ page }) => {
        //1. Launch application and make assert title and header    
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

        //2. Click on make appoinment
        /**
         * ELEMENT : Button And Link
         * 
         * @actions
         * 1. Click
         * 2. Press
         * 3. Double click
         * 4. Right click
         * 5. Hower id link
         * 6. [Optional] timout if slow
         */

        //await page.getByRole("link", { name: "Make Appointment" }).click();
        // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
        // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
        // await page.getByRole("link", { name: "Make Appointment" }).click({button:'right'});
        // await page.getByRole("link", { name: "Make Appointment" }).hover();
        await page.getByRole("link", { name: "Make Appointment" }).click({ timeout: 10_000 });
        await expect(page.getByText("Please login to make appointment.")).toBeVisible();

        //3. Login successfully

        /**
         * ELEMENT : Text box
         * 
         * @actions
         * 1.✅ fill
         * 2. clear/click before filling 
         * 3. pressSquentially (slow typing)
         */

        // await page.getByLabel("username").fill("John Doe");
        // await page.getByLabel("username").fill("John Doe");
        //await page.getByLabel("username").clear();
        //await page.getByLabel("username").fill("John Doe");
        await page.getByLabel("username").pressSequentially("John Doe", { delay: 300 });

        await page.getByLabel("Password").fill("ThisIsNotAPassword");
        await page.getByRole("button", { name: "Login" }).click();

        //4. Assert to text
        await expect(page.locator("h2")).toContainText("Make Appointment");



    })

    test('Should make appointment with non-default values', async ({ page }) => {

        /**
        * ELEMENT : Dropdown 
        * 
        * @actions
        * 1. Assert default option
        * 2. Select by :
        *  -label
        *  -Index
        * 3. Assert the count
        * 4. Get all dropdown values
        */

        // assert by default
        await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

        //select by label
        await page.getByLabel('Facility').selectOption({ label: 'Seoul CURA Healthcare Center' })

        //select by index
        await page.getByLabel('Facility').selectOption({ index: 0 })

        //assert the count
        let drpdwnOptions = page.getByLabel('Facility').locator('option');
        expect(drpdwnOptions).toHaveCount(3);

        //Get all dropdown values
        let drpdwnElements = await page.getByLabel('Facility').all();
        let listOptions = [];

        for (let ele of drpdwnElements) {
            let eleTxt = await ele.textContent();
            if (eleTxt) {
                listOptions.push(eleTxt);

            }

        }

        console.log(listOptions);



        /**
       * ELEMENT : Check / Radio button 
       * 
       * @actions
       * 1. Assert default option -- to be check or unchecked 
       * 2. Check/Uncheck
       * 
       * @notes
       * Radio button - allows only check one option
       * Check box - allows to check multiple options
       */

        //checkbox
        // await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).click();
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).uncheck();

        //radio button

        //assert for default option
        await expect(page.getByRole('radio', { name: 'Medicare' })).toBeChecked();
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        await expect(page.getByRole('radio', { name: 'Medicare' })).not.toBeChecked();





        // date field
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('01/07/2027');
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
