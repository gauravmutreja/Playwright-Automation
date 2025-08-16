export class APIUtils {

    constructor(loginPayLoad, apiRequestContext) {
        this.loginPayLoad = loginPayLoad
        this.request = apiRequestContext
    }

    async getToken() {
        //Login Request
        const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        )
        // expect(loginResponse).toBeOK();
        console.log(loginResponse)
        const loginResponseJson = await loginResponse.json();
        console.log("\nLoginResponse Json: "+JSON.stringify(loginResponseJson))
        let token = loginResponseJson.token;
        console.log("\nToken: " + token);
        return this.token = token;
    };

    async getOrder(orderPayload) {
        //Order Request
        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:
                {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                }
            });
        console.log("\n"+ orderResponse);
        //await expect(orderResponse).toBeOK();
        const orderResponseJson = await orderResponse.json()
        console.log("orderResponseJson: "+ JSON.stringify(orderResponseJson));
        response.orderID= orderResponseJson.orders[0];
        console.log("\n"+ response.orderID);
        return response;
    };
}