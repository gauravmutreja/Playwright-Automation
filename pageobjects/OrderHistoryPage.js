export class OrderHistroyPage{

    constructor(page){
        this.page = page;
        this.waitFor = page.locator("tbody");
        this.orderList = page.locator("tbody tr");
    }

    async waitForOrderList(){
        await this.waitFor.waitFor();
    }

    async searchAndViewOrder(orderID){
        for(let i=0; i<await this.orderList.count();i++){
            const RowOrderId = await this.orderList.nth(i). locator("th").textContent();
            if(orderID.includes(RowOrderId) ){
                await this.orderList.nth(i).locator("button:has-text('View')").click();
                break;
            }
        }
    }
    
}