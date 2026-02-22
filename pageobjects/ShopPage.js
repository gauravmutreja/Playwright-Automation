export class ShopPage {

    constructor(page) {
        this.page = page;
        this.productHeadings = page.locator("h4");
        this.productContainer = page.locator(".card");
    }

    async getProductByName(productName) {
        return this.page.locator(`text=${productName}`);
    }

    async isProductPresent(productName) {
        const product = await this.getProductByName(productName);
        return await product.isVisible();
    }

    async verifyProductExists(productName) {
        const allProducts = await this.getAllProductNames();
        return allProducts.includes(productName);
    }

    async getProductCount() {
        return await this.productHeadings.count();
    }

    async getAllProductNames() {
        const products = await this.productHeadings.allTextContents();
        return products.map(product => product.trim());
    }

}
