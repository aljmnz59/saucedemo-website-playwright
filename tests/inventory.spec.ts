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

test('Verify user can add item to cart', async () => {
    await test.step('Add item to cart', async () => {
        await inventoryPage.clickAddItemToCart();
        await inventoryPage.assertAddCartBadge();
    });
    
});

test('Verify user can remove item in cart', async () => {
    await test.step('Add item to cart', async () => {
        await inventoryPage.clickAddItemToCart();
    });
    await test.step('Remove item in cart', async () => {
        await inventoryPage.clickRemoveItemToCart();
        await inventoryPage.assertRmvCartBadge();
    });
});

test('Verify user can sort inventory product', async () => {
    await test.step('Click product sort', async () => {
        await inventoryPage.clickProdSort();
    });
    await test.step('Select product sort', async () => {
        await inventoryPage.selectProdSortAZ();
        
    });
    await test.step('Check selected product sort', async () => {
        await inventoryPage.assertProdSort();
    })
    //Product Sort Order Assertion
    await test.step('Check product list order', async () => {
        await inventoryPage.assertProdSortOpt(); //BUG #1 - Product sort elemet (<select> doesn't have multiple attributes, unable to assert option values)
    });
});
    
test('Verify product details are displayed', async () => {
    await test.step('Check products name', async () => {
        await inventoryPage.assertProductsName(); //BUG #2 - Unexpected product name displayed on page
    });
    await test.step('Check products description', async () => {
        await inventoryPage.assertProductsDescription(); 
    });
    await test.step('Check products price', async () => {
        await inventoryPage.assertProductsPrice();
    });
    await test.step('Check products image', async () => {
        await inventoryPage.assertProductsImg();
    });
});