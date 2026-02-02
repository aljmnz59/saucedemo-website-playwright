import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
    //variables
    readonly page:Page;
    readonly addToCartBtn: Locator;
    readonly cartBadge: Locator;
    readonly removeToCartBtn: Locator;
    readonly prodSort: Locator;
    readonly prodDetails: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemImg: Locator;

    //constructors
    constructor(page: Page){
        this.page = page;
        this.addToCartBtn = page.locator(`//*[@id="add-to-cart-sauce-labs-backpack"]`);
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.removeToCartBtn = page.locator('//*[@id="remove-sauce-labs-backpack"]');
        this.prodSort = page.locator('[data-test="product-sort-container"]');
        this.prodDetails = page.locator('.inventory_item');
        this.itemName = page.locator('.inventory_item_name');
        this.itemDescription = page.locator('.inventory_item_desc');
        this.itemPrice = page.locator('.inventory_item_price');
        this.itemImg = page.locator('.inventory_item_img');
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

    async assertProdSortOpt(){
        await expect.soft(this.prodSort).toHaveValues(['az', 'za', 'lohi', 'hilo']);
    }

    async selectProdSortAZ(){
        await this.prodSort.selectOption({value:'az'});
        
    }
    
    async assertProdSort(){
        await expect(this.prodSort).toHaveValue('az');
        await expect(this.page.locator('.active_option')).toHaveText('Name (A to Z)');
    }

    async assertProductsName(){
        const itemName = await this.itemName.count();
        for(let i = 0; i < itemName; i++){
            await expect(this.itemName.nth(i)).toBeVisible();
            await expect.soft(this.itemName.nth(i)).toHaveText(/.*Sauce Labs/, {useInnerText: true});;
        }
    }

    async assertProductsDescription(){
        const itemDesc = await this.itemDescription.count();
        for(let i = 0; i < itemDesc; i++){
            await expect(this.itemDescription.nth(i)).toBeVisible();
        }
    }

    async assertProductsPrice(){
        const itemPrice = await this.itemPrice.count();
        for(let i = 0; i < itemPrice; i++){
            await expect(this.itemPrice.nth(i)).toBeVisible();
        }
    }

    async assertProductsImg(){
        const itemImg = await this.itemImg.count();
        for(let i = 0; i < itemImg; i++){
            await expect(this.itemImg.nth(i)).toBeVisible();
        }
    }

}

export default InventoryPage;