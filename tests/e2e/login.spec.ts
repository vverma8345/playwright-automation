import { test, expect } from '@playwright/test'
import LoginPage from '../page-objects/cura.login.page';

    test.only("Should login successfully", async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.loginToCuraApp("https://katalon-demo-cura.herokuapp.com/", "John Doe", "ThisIsNotAPassword");


    });

    