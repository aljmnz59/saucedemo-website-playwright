import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page'; 

const URL = 'https://www.saucedemo.com/';
let loginPage: LoginPage;
const pageInventoryUrl = /.*inventory.html/;


test.beforeEach(async ({page}) => {
    await page.goto(URL);
    loginPage = new LoginPage(page);
});

test('Verify saucedemo logo', async () => {
    await loginPage.assertPageLogo();
});

test('Verify succesful login using valid credentials', async () => {
    await test.step('Input valid user name', async () => {
        await loginPage.clickUsername();
        await loginPage.fillUsername('standard_user');
    });
    await test.step('Input valid password', async () => {
        await loginPage.clickPassword();
        await loginPage.fillPassword('secret_sauce');
    });
    await test.step('Click Login button', async () => {
        await loginPage.clickLoginBtn();
    });
    await test.step('Check inventory page URL', async () => {
        await loginPage.assertPageUrl(pageInventoryUrl);
    });
});

test.describe('Verify unsuccessful login', async () => {
    test('Unsuccessful Login using invalid username', async () =>{
        await test.step('Input invalid username', async () => {
            await loginPage.clickUsername();
            await loginPage.fillUsername('sandard_user');
        });
        await test.step('Input valid username', async () => {
            await loginPage.clickPassword();
            await loginPage.fillPassword('secret_sauce');
        });
        await test.step('Clicl Login button', async () => {
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrInvalidLoginMsg();
        });
    });

    test('Unsuccessful Login using invalid password', async () => {
        await test.step('Act', async () => {
            await loginPage.clickUsername();
            await loginPage.fillUsername('standard_user');
            await loginPage.clickPassword();
            await loginPage.fillPassword('sauce_secret');
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrInvalidLoginMsg();
        });
    });

    test('Unsuccessful login with empty username', async () => {
        await test.step('Act', async () => {
            await loginPage.clickPassword();
            await loginPage.fillPassword('secret_sauce');
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrEmptyUserFieldMsg();
        });
    });

    test('Unsuccessful login with empty password', async () => {
        await test.step('Act', async () => {
            await loginPage.clickUsername();
            await loginPage.fillUsername('standard_user');
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrEmptyPassFieldMsg();
        });
    });
});