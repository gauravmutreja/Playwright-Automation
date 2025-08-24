import { test, expect } from "@playwright/test"

test("End to End Testing", async ({ page }) => {
    const email = "gaurav@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Gaurav@123");
    await page.locator("[name='login']").click();
    await page.waitForLoadState('networkidle');
    console.log(await page.locator(".card-body b").allTextContents());
    const products = page.locator(".card-body");
    const productName = "ADIDAS ORIGINAL" // product to be added
    //Iterate over all product and add the specific product to cart
    for (let i = 0; i < await products.count(); i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    //check cart: if product got added
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    console.log('bool:', bool);
    expect(bool).toBeTruthy();
    //Go to checkout page, fill details and select country
    await page.locator("button[type='button']").nth(1).click();//("text=Checkout")
    const monthDropdown = page.locator("select").first();
    const dayDropdown = page.locator("select").nth(1);
    await monthDropdown.selectOption("06");
    await dayDropdown.selectOption("19");
    const cardNumber = page.locator(".payment__cc .text-validated");
    await cardNumber.fill("0123 4567 8910 1213");
    // const cvvNumber = page.locator("text=CVV Code ");
    // await cvvNumber.locator(".input").fill("033");
    const coupon = page.locator("[name='coupon']");
    await coupon.fill("rahulshettyacademy");
    const applyCoupon = page.locator("button[type='submit']");
    await applyCoupon.click();
    /* 
    const couponapplied = page.locator("text=* Coupon Applied");
    // Wait for coupon to be applied and check the message
    await page.locator("text=*Coupon Applied").waitFor();
    // Verify coupon applied message
    await expect (couponapplied).toBeVisible();
    console.log(couponapplied.textContent());
    await expect(couponapplied.trim().toContainText("Coupon Applied")); 
    */

    // Select Country
    await page.locator("[placeholder*='Country']").pressSequentially("IND");
    const dropdownCountry = page.locator(".ta-results [type='button']",)
    await dropdownCountry.first().waitFor();
    for (let i = 0; i < await dropdownCountry.count(); i++) {
        let text = await dropdownCountry.nth(i).textContent();
        if (text.trim() === "India") {
            await dropdownCountry.nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name label[type='text']")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");
    for (let i = 0; i < await orderList.count(); i++) {
        const RowOrderId = await orderList.nth(i).locator("th").textContent();
        if (orderId.includes(RowOrderId)) {
            await orderList.nth(i).locator("button:has-text('View')").click();
            break;
        }
    }
    await page.locator("div small").waitFor();
    const orderSummaryId = await page.locator(".col-text.-main").textContent();
    expect(orderId).toContain(orderSummaryId);
});