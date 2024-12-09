import { test, expect } from "@playwright/test"

test("@Browser context validating", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("anshika@gmail.com")
    await page.locator("#userPassword").fill("Iamking@000")
    await page.locator("[name='login']").click()
    //await page.waitForLoadState('networkidle')
    await page.locator(".card-body b").first().waitFor() //wait for() works only for single matching element not array of elements
    await page.locator(".card-body b").allTextContents();

});
