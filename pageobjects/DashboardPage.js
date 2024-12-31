export class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchAndAddtoCart(productName) {
        const titles = await this.productsText.allTextContents();
        console.log(titles); 
        //Iterate over all product and add the specific product to cart
        for (let i = 0; i < await this.products.count(); i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();

    }
}