import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page'; 

const URL = 'https://www.saucedemo.com/';
let loginPage: LoginPage;
const pageUrl = /.*inventory.html/
const userName = process.env.USERNAME!;
const passWord = process.env.PASSWORD!;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    loginPage = new LoginPage(page);
});

test('Check saucedemo logo', async () => {
    await loginPage.assertPageLogo();
});

test('Verify succesful login using valid credentials', async () => {
    await test.step('Act', async () => {
        await loginPage.clickUsername();
        await loginPage.fillUsername(userName);
        await loginPage.clickPassword();
        await loginPage.fillPassword(passWord);
        await loginPage.clickLoginBtn();
    });
    await test.step('Assert', async () => {
        await loginPage.assertPageUrl(pageUrl);
    });
});

test.describe('Verify unsuccessful login', async () => {
    test('Unsuccessful Login using invalid username', async () =>{
        await test.step('Act', async () => {
            await loginPage.clickUsername();
            await loginPage.fillUsername('sandard_user');
            await loginPage.clickPassword();
            await loginPage.fillPassword(passWord);
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrInvalidLoginMsg();
        });
    });

    test('Unsuccessful Login using invalid password', async () => {
        await test.step('Act', async () => {
            await loginPage.clickUsername();
            await loginPage.fillUsername(userName);
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
            await loginPage.fillPassword(passWord);
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrEmptyUserFieldMsg();
        });
    });

    test('Unsuccessful login with empty password', async () => {
        await test.step('Act', async () => {
            await loginPage.clickUsername();
            await loginPage.fillUsername(userName);
            await loginPage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await loginPage.assertErrEmptyPassFieldMsg();
        });
    });
});