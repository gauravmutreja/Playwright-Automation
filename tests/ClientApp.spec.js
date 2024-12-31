import { test, expect } from "@playwright/test"


test("@Login and print context ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("anshika@gmail.com")
    await page.locator("#userPassword").fill("Iamking@000")
    await page.locator("[name='login']").click()
    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor() //wait for() works only for single matching element not array of elements
    console.log(await page.locator(".card-body b").allTextContents());

});

test("End to End Testing", async ({ page }) => {
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[name='login']").click();
    await page.waitForLoadState('networkidle')
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
    await page.locator("text=Apply Coupon").first().click();
    const checkCoupon = page.locator("text=* Coupon Applied");
    // const couponapplied = await checkCoupon.textContent();
    // console.log(couponapplied.trim());
    // await expect(couponapplied.trim().toContainText("Coupon Applied"));
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
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.pause();
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const orderList = page.locator("tbody tr");
    for(let i=0; i<await orderList.count();i++){
        const RowOrderId = await orderList.nth(i). locator("th").textContent();
        if(orderId.includes(RowOrderId) ){
            await orderList.nth(i).locator("button:has-text('View')").click();
            break;
        }
    }
    await page.locator("div small").waitFor();
    const orderSummaryId = await page.locator(".col-text.-main").textContent();
    expect(orderId).toContain(orderSummaryId);
});

test('Facebook Search', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByLabel('Language: ‪English‬').click();
    await page.getByRole('button', { name: 'Reject all' }).click();
    await page.getByLabel('Search', { exact: true }).click();
    await page.getByLabel('Search', { exact: true }).fill('Gaurav Mutreja');
    await page.goto('https://www.google.com/search?q=Gaurav+Mutreja&sca_esv=adafaf889a5483d7&source=hp&ei=QSVYZ-axEqyKxc8Pg_zHuAM&iflsig=AL9hbdgAAAAAZ1gzUdcwCs6Cc398ln4QwXXeaOzQ4Spd&ved=0ahUKEwim1t7zi52KAxUsRfEDHQP-ETcQ4dUDCBE&uact=5&oq=Gaurav+Mutreja&gs_lp=Egdnd3Mtd2l6Ig5HYXVyYXYgTXV0cmVqYTIFEAAYgAQyCxAAGIAEGIYDGIoFMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIEMgUQABjvBTIIEAAYgAQYogRIiWhQ_gZYuh5wAXgAkAEAmAFooAHjBqoBBDEzLjG4AQPIAQD4AQGYAg6gAowHqAIAwgILEC4YgAQY0QMYxwHCAgUQLhiABMICBxAAGIAEGArCAgsQLhiABBjHARivAcICBhAAGBYYHpgDAfEFv3jRXL-eTTiSBwQxMy4xoAe-lwE&sclient=gws-wiz');
    await page.getByRole('link', { name: 'Gaurav Mutreja in people' }).click();
    await page.getByRole('button', { name: 'Decline optional cookies' }).click();
    await expect(page.getByTestId('paginated_results').getByLabel('Gaurav Mutreja').nth(1)).toBeVisible();
    await expect(page.getByTestId('paginated_results').getByTestId('results')).toContainText('Gaurav Mutreja');
    await page.getByTestId('paginated_results').getByRole('link', { name: 'Gaurav Mutreja' }).nth(1).click();
    await page.getByLabel('Close').click();
});