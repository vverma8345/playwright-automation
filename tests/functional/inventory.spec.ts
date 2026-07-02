import { test, expect } from "@playwright/test"

test.describe('Inventory feature', () => {

    test.beforeEach('Login with valid creds', async ({ page }) => {

        //launch url
        await page.goto('https://www.saucedemo.com/');

        // file username & password 
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //assert products page
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });

    test('Should confirm all produc should non-zero values', async ({ page }) => {


        let productsEls = page.locator('.inventory_item');
        await expect(productsEls).toHaveCount(6);

        let totalProducts = await productsEls.count();

        let priceArr = [];

        for (let i = 0; i <= totalProducts; i++) {
            let eleNode = productsEls.nth(i);

            let productName = await eleNode.locator(".inventory_item_name").innerText();
            let price = await eleNode.locator(".inventory_item_price").innerText();

            console.log(`Product: ${productName}, Price: ${price}`);

            priceArr.push(price);

        }
        console.log(`Original price of products: ${priceArr}`);

    })

})



