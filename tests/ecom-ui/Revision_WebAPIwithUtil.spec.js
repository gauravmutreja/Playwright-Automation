import { test, expect, request } from "@playwright/test"
import exp from "constants";
import { Revision_APIUtils } from "../../utils/Revision_APIUtils";
const loginPayLoad = { userEmail: "gaurav@gmail.com", userPassword: "Gaurav@123" }
let orderPayload = { orders: [{ country: "Pakistan", productOrderedId: "676a631fe2b5443b1f004a20" }] }
let response;

test.beforeAll(async () => {
    const apiRequest = await request.newContext();
    const revision_APIUtils = new Revision_APIUtils(apiRequest,loginPayLoad );
    response = await revision_APIUtils.getOrderId(orderPayload);
    console.log("\nResponse object: "+JSON.stringify(response));
});



test("Place Order via API Test", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token)
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");
    for (let i = 0; i < await orderList.count(); i++) {
        const RowOrderId = await orderList.nth(i).locator("th").textContent();
        console.log(RowOrderId + " - " + response.orderId)
        if (response.orderId === RowOrderId) {
            console.log('order found');
            await orderList.nth(i).locator("button:has-text('View')").click();
            console.log('button clicked');
            break;
        }
    }
    //await page.locator("div small").waitFor();
    const orderSummaryId = await page.locator(".col-text.-main").textContent();
    expect(response.orderId).toContain(orderSummaryId);
    await page.pause();
    expect(response.orderId).toContain(orderSummaryId);
});