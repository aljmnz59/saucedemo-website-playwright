import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
    //variables
    readonly page:Page;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;
    readonly removeToCartBtn: Locator;
    readonly prodSort: Locator;
    //constructors
    constructor(page: Page){
        this.page = page;
        this.addToCartBtn = page.locator(`//*[@id="add-to-cart-sauce-labs-backpack"]`);
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.removeToCartBtn = page.locator('//*[@id="remove-sauce-labs-backpack"]');
        this.prodSort = page.locator('.product_sort_container');
    }
    //methods
    async clickAddItemToCart(){
        await this.addToCartBtn.click();
    }

    async assertAddCartBadge(){
        await expect(this.cartBadge).toBeVisible();
    }

    async clickRemoveItemToCart(){
        await this.removeToCartBtn.click();
    }

    async assertRmvCartBadge(){
        await expect(this.cartBadge).not.toBeVisible();
    }

    async clickProdSort(){
        await this.prodSort.click();
    }

    async selectProdSort(){
        await this.prodSort.selectOption({value:'az'});
    }

}

export default InventoryPage;