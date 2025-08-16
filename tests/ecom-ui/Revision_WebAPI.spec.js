import { test, expect, request } from "@playwright/test"
import exp from "constants";
const loginPayLoad = { userEmail: "gaurav@gmail.com", userPassword: "Gaurav@123" }
let orderPayload = { orders: [{ country: "Pakistan", productOrderedId: "676a631fe2b5443b1f004a20" }] }
let token;
let orderId;

test.beforeAll(async () => {
    const apiRequest = await request.newContext();
    const loginResponse = await apiRequest.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: loginPayLoad });
    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse).toBeOK();
    console.log("\n loginResponse: " + loginResponse);
    const loginResponseJson = await loginResponse.json();
    console.log("\n loginResponseJson: " + loginResponse.json())
    token = loginResponseJson.token;
    console.log("\nToken:=" + token);

    const orderResponse = await apiRequest.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers:
            {
                'Authorization': token,
                'Content-Type': "application/json"
            }
        })
    const orderResponseJson = await orderResponse.json();
    console.log("\norderResponseJson: " + orderResponseJson)
    orderId = orderResponseJson.orders[0];
    console.log("\norderID: " + orderId)
});




test("Place Order via API Test", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, token)
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");
    for (let i = 0; i < await orderList.count(); i++) {
        const RowOrderId = await orderList.nth(i).locator("th").textContent();
        console.log(RowOrderId + " - " + orderId)
        if (orderId === RowOrderId) {
            console.log('order found');
            await orderList.nth(i).locator("button:has-text('View')").click();
            console.log('button clicked');
            break;
        }
    }
    //await page.locator("div small").waitFor();
    const orderSummaryId = await page.locator(".col-text.-main").textContent();
    expect(orderId).toContain(orderSummaryId);
    await page.pause();
    expect(orderId).toContain(orderSummaryId);
});