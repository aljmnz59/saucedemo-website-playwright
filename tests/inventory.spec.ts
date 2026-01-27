import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
const URL = 'https://www.saucedemo.com/';

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    loginPage = new LoginPage(page);
    //Login
    await loginPage.clickUsername();
    await loginPage.fillUsername('standard_user');
    await loginPage.clickPassword();
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLoginBtn();

    inventoryPage = new InventoryPage(page);
});

test('Verify Adding and Removing Product to Cart', async () => {
    await test.step('Add item to cart', async () => {
        await inventoryPage.clickAddItemToCart();
        await inventoryPage.assertAddCartBadge();
    });
    await test.step('Remove item to cart', async () => {
        await inventoryPage.clickRemoveItemToCart();
        await inventoryPage.assertRmvCartBadge();
    });
});

test('Verify Product Sort', async () => {
    await test.step('Click and select product sort', async () => {
        await inventoryPage.clickProdSort();
        await inventoryPage.selectProdSort();
    });

});