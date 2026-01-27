import { Locator, expect, Page } from "@playwright/test";

export class LoginPage {
    //variables
    readonly page:Page;
    readonly pageLogo:Locator;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginBtn:Locator;
    readonly errorLoginContainer:Locator
    readonly errorLoginMsg: string = `Epic sadface: Username and password do not match any user in this service`;
    readonly errorEmptyUserFieldMsg: string = `Epic sadface: Username is required`;
    readonly errorEmptyPassFieldMsg: string = `Epic sadface: Password is required`;

    //constructor
    constructor (page: Page){
        this.page = page;
        this.pageLogo = page.locator('.login_logo');
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', {name : 'Login'});
        this.errorLoginContainer = page.locator('.error-message-container.error');
    }

    //methods
    async assertPageUrl(pageUrl: RegExp){
        await expect(this.page).toHaveURL(pageUrl)
    }

    async assertPageLogo(){
        await expect(this.pageLogo).toBeVisible();
        await expect(this.pageLogo).toHaveText('Swag Labs');
    }

    async clickUsername(){
        await this.username.click();
    }

    async fillUsername(userName: string){
        await this.username.fill(userName);
    }

    async clickPassword(){
        await this.password.click();
    }

    async fillPassword(password: string){
        await this.password.fill(password);
    }

    async clickLoginBtn(){
        await this.loginBtn.click();
    }

    async assertErrInvalidLoginMsg(){
        await expect(this.errorLoginContainer).toHaveText(this.errorLoginMsg);
    }

    async assertErrEmptyUserFieldMsg(){
         await expect(this.errorLoginContainer).toHaveText(this.errorEmptyUserFieldMsg);
        
    }

    async assertErrEmptyPassFieldMsg(){
         await expect(this.errorLoginContainer).toHaveText(this.errorEmptyPassFieldMsg);
        
    }

}

export default LoginPage;