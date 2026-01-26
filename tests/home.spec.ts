import {test, expect, Page} from '@playwright/test';
import { HomePage } from '../pages/home-page'; 

const URL = 'https://www.saucedemo.com/';
let homePage: HomePage;
const pageUrl = /.*inventory.html/

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

test('Check saucedemo logo', async () => {
    await homePage.assertPageLogo();
});

test('Verify succesful login using valid credentials', async () => {
    await test.step('Act', async () => {
        await homePage.clickUsername();
        await homePage.fillUsername('standard_user');
        await homePage.clickPassword();
        await homePage.fillPassword('secret_sauce');
        await homePage.clickLoginBtn();
    });
    await test.step('Assert', async () => {
        await homePage.assertPageUrl(pageUrl);
    });
});

test.describe('Verify unsuccessful login using invalid credentials', async () => {
    test('Unsuccessful Login using invalid username', async ({page}) =>{
        await test.step('Act', async () => {
            await homePage.clickUsername();
            await homePage.fillUsername('sandard_user');
            await homePage.clickPassword();
            await homePage.fillPassword('secret_sauce');
            await homePage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await homePage.assertErrorLoginMsg();
        });
    });

    test('Unsuccessful Login using invalid password', async () => {
        await test.step('Act', async () => {
            await homePage.clickUsername();
            await homePage.fillUsername('error_user');
            await homePage.clickPassword();
            await homePage.fillPassword('sauce_secret');
            await homePage.clickLoginBtn();
        });
        await test.step('Assert', async () => {
            await homePage.assertErrorLoginMsg();
        });
    });
});