export class CartPage{

    constructor(page){
        this.page = page;
        this.products = page.locator("div li");
        this.btnCheckout = page.locator("button[type='button']").nth(1);
    }

    getProduct(productName){
        return this.page.locator("h3:has-text('" + productName + "')")
    }

    async waitForProduct(){
        await this.products.first().waitFor();
    }

    async navigateToCheckout(){
        await this.btnCheckout.click()
    }

}