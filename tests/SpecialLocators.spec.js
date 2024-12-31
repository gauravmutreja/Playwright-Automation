import { test, expect } from "@playwright/test"

test("Basics SL", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();//only text inside label tag
    await page.getByLabel("Employed").check(); //can use instead of click in checkbox or radio-button
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Gaurav123");//having attribute placeholder
    await page.getByRole("button", { name: "Submit" }).click();//either tag=button or class/type = btn or button
    console.log(page.getByText("Success! The Form has been submitted successfully!."));
    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click(); //chaining

});

test("E2E Special Locators", async ({ page }) => {
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", { name: "login" }).click();
    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Cart" }).click();
    //check cart: if product got added
    await page.getByRole("listitem").getByRole("button",{ name: "Cart" }).click();

    await page.locator("div li").first().waitFor();

    //assertion if porduct got added
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    //Go to checkout page, fill details and select country
    await page.getByRole("button", { name: "Checkout" }).click();

    //select country
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", { name: "India" }).nth(1).click();

    //click place order
    await page.getByText("Place Order ").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
});