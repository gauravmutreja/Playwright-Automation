export class Revision_APIUtils {

    constructor(apiRequest,loginPayLoad ){
        this.apiRequest = apiRequest;
        this.loginPayLoad = loginPayLoad;

    }
    async getToken(){
        const loginResponse = await this.apiRequest.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayLoad });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async getOrderId(orderPayload){
        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiRequest.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayload,
                    headers:
                    {
                        'Authorization':response.token ,
                        'Content-Type': "application/json"
                    }
                })
            const orderResponseJson = await orderResponse.json();
            console.log("\norderResponseJson: " + orderResponseJson)
            response.orderId =  orderResponseJson.orders[0];
            return response;
    }
}