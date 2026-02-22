import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../../utils/APIUtils.js";


// Creating global variables
const loginPayLoad = {userEmail: "gaurav@gmail.com",userPassword: "Gaurav@123"}
const orderPayload = {"orders": [{country: "Bermuda",productOrderedId: "6581cade9fd99c85e8ee7ff5"}]}
let response;

test.beforeAll(async () => {
    const apiRequestContext = await request.newContext()
    let apiUtilsObj = new APIUtils(loginPayLoad, apiRequestContext);
    response = await apiUtilsObj.getOrder(orderPayload);
});

test("@API Place Order via API Test Util", async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");
    for (let i = 0; i < await orderList.count(); i++) {
        const RowOrderId = await orderList.nth(i).locator("th").textContent();
        console.log(RowOrderId + " - " + response.orderID)
        if (response.orderID == RowOrderId) {
            console.log('order found');
            await orderList.nth(i).locator("button:has-text('View')").click();
            console.log('button clicked');
            break;
        }
    }
    await page.locator("div small").waitFor();
    const orderSummaryId = await page.locator(".col-text.-main").textContent();
    expect(response.orderID).toContain(orderSummaryId);
    await page.pause();


});
