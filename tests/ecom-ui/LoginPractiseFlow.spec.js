import { test, expect } from "@playwright/test";
import { PoManager } from "../../utils/PoManager.js";
import dataset from "../../test-data/LoginPractiseTestData.json";

for (const data of dataset) {
test(`@PO: Login and Verify ${data.productName} Product on Shop Page`, async ({ page }) => {

    const poManager = new PoManager(page);

    // Step 1: Navigate to login page and perform login
    const loginPage = poManager.getLoginPagePractise();
    await loginPage.goToPage();
    await loginPage.validLogin(data.username, data.password);

    // Step 2: Wait for shop page to load and verify product
    const shopPage = poManager.getShopPage();
    
    // Verify that the product is present on the page
    const isProductPresent = await shopPage.verifyProductExists(data.productName);
    expect(isProductPresent).toBe(true);

    // Additional verification: Get all products and verify product is in the list
    const allProducts = await shopPage.getAllProductNames();
    expect(allProducts).toContain(data.productName);

    console.log(`✓ Successfully logged in and verified "${data.productName}" product is present on the shop page`);
    console.log("Available Products:", allProducts);

});
}
