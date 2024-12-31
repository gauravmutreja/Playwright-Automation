import { test, expect } from "@playwright/test";
const loginPayLoad = { userEmail: "gaurav@gmail.com", userPassword: "Gaurav@123" }
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}
let token;
let orderID;

test.beforeAll(async ({ request }) => {
    //Login Request

    // const requestContext = request.newContext()
    const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    )
    expect(loginResponse).toBeOK();
    //console.log(await loginResponse.json());
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson)
    console.log("printing strigified object" + JSON.stringify(loginResponseJson))
    token = loginResponseJson.token;
    console.log("token: " + token);

    //Order Request

    const orderResponse = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": token
            }

        });
    expect(orderResponse).toBeOK();
    const orderResponseJson = await orderResponse.json()
    console.log("Reponse: "+orderResponseJson);
    orderID =  orderResponseJson.orders[0];
    console.log("orderID: "+orderID);

});

test("Place Order via API Test", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");
    for (let i = 0; i < await orderList.count(); i++) {
        const RowOrderId = await orderList.nth(i).locator("th").textContent();
        if (orderID.includes(RowOrderId)) {
            await orderList.nth(i).locator("td:has-text('View')").click();
            break;
        }
    }
    await page.locator("div small").waitFor();
    const orderSummaryId = await page.locator(".col-text.-main").textContent();
    expect(orderID).toContain(orderSummaryId);
});
