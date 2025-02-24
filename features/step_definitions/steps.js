const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const { PoManager } = require("../../utils/PoManager");

Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000}, async function (username, password) {
    // const browser = await playwright.chromium.launch({
    //     headless: false
    // });
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // this.poManager = new PoManager(page);
    this.username = username;
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    this.dashBoard = this.poManager.getDashboardPage();
    await this.dashBoard.searchAndAddtoCart(productName);
    await this.dashBoard.navigateToCart();
});

Then('Verify {string} is diplayed in Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.waitForProduct();
    //check cart: if product got added
    await expect(cartPage.getProduct(productName )).toBeVisible();
    //Go to checkout page, fill details and select country
    await cartPage.navigateToCheckout();//("text=Checkout")
});

When('Enter valid detail and Place the Order', async function () {
    const ordersPage = this.poManager.getOrdersPage();
    let cardDetails = {};
    cardDetails.month = "06";
    cardDetails.day = "19";
    cardDetails.cardNumber = "0123 4567 8910 1213";
    cardDetails.cvv = "033";
    await ordersPage.fillCardDetails(cardDetails);
    const couponCode = "rahulshettyacademy"
    await ordersPage.applyCoupon(couponCode)
    await expect(ordersPage.checkCoupon).toContainText("* Coupon Applied");
    const country = "IND"
    await ordersPage.selectCountry(country );
    await expect(ordersPage.username).toHaveText(this.username);
    await ordersPage.placeOrder();
//Thankyou page
    const thankYouPage = this.poManager.getThankYouPage();
    console.log(await thankYouPage.thankYouText.textContent());
    await expect(thankYouPage.thankYouText).toHaveText(" Thankyou for the order. ");
    this.orderId = await thankYouPage.getOrderId();
    console.log(this.orderId);
    await thankYouPage.goToOrderHistoryPage();
});

Then('Verify order is present in the OrderHistory',async function () {
//Order History Page
    const orderHistPage = this.poManager.getOrderHistPage();
    await orderHistPage.waitForOrderList();
    await orderHistPage.searchAndViewOrder(this.orderID);
//OrderSumary Page
    const orderSummaryPage = this.poManager.getOrderSummaryPage()
    orderSummaryPage.waitForOrderSummary();
    await expect(orderSummaryPage.orderId).toHaveText(this.orderId);
});

Given('Login to Ecommerce2 application with {string} and {string}',async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title());
    const usernameField = this.page.locator('#username');
    const passwordField = this.page.locator('[name="password"]')
    const signIn = this.page.locator('[type="submit"]');
    //css
    await usernameField.fill(username);
    await passwordField.fill(password );
    await signIn.click();
    
  });

  Then('Verify Error message is diplayed',async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
  });