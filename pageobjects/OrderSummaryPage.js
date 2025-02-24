export class OrderSummaryPage{
    
    constructor(page){
        this.page = page;
        this.orderSummaryIdword = page.locator("div small");
        this.orderId = page.locator(".col-text.-main");


    }

    async waitForOrderSummary(){
        this.orderSummaryIdword.waitFor();
    }
    

}