export class ThankYouPage {
    constructor(page) {
        this.page = page
        this.thankYouText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderMenu = page.locator("button[routerlink*='myorders']")
    }

    async getOrderId() {
        const orderIdRaw = await this.orderId.textContent();
        return orderIdRaw.split(" ")[2];
    }

    async goToOrderHistoryPage() {
        await this.orderMenu.click()
    }

}