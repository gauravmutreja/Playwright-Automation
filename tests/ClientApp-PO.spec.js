import { test, expect } from "@playwright/test";
import { PoManager } from "../pageobjects/PoManager";
import {dataset} from "../test-data/ClientAppTestData";


for(const data of dataset){
test(`@PO: End to End Testing for ${data.productName}`, async ({ page }) => {
    // Test Data

    const username = "gaurav@gmail.com";
    const password = "Gaurav@123"
    const productName = "ADIDAS ORIGINAL" // product to be added

    const poManager = new PoManager(page);
    //Login
    const loginPage = PoManager.getLoginPage();
    await loginPage.goToPage();
    await loginPage.validLogin(username, password);
    
    //Dashboard: Search Prod and Add to cart
    const dashBoard = PoManager.getDashboardPage();
    await dashBoard.searchAndAddtoCart(productName);
    await dashBoard.navigateToCart();

    //Cart Page
    const cartPage = poManager.getCartPage();
    await cartPage.waitForProduct();
    //check cart: if product got added
    await expect(cartPage.getProduct(productName)).toBeVisible();
    //Go to checkout page, fill details and select country
    await cartPage.navigateToCheckout();//("text=Checkout")
    
    //OrdersPage:
    const ordersPage = poManager.getOrdersPage();
    let cardDetails = {};
    cardDetails.month = "06";
    cardDetails.day = "19";
    cardDetails.cardNumber = "0123 4567 8910 1213";
    cardDetails.cvv = "033";
    await ordersPage.fillCardDetails(cardDetails);
    const couponCode = "rahulshettyacademy"
    await ordersPage.applyCoupon(couponCode)

    expect(ordersPage.checkCoupon).toContainText("* Coupon Applied");

    // // Select Country
    const country = "IND"
    await ordersPage.selectCountry(country);
    
    await expect(ordersPage.username).toHaveText(username);
    await ordersPage.placeOrder();
   
    // //Thankyou page
    const thankYouPage = poManager.getThankYouPage();
    await expect(thankYouText).toHaveText(" Thankyou for the order. ");
    console.log(await thankYouPage.getOrderId());
    const orderID = await thankYouPage.getOrderId();
    await thankYouPage.goToOrderHistoryPage();

    //Order History Page
    const orderHistPage = poManager.getOrderHistPage();
    await orderHistPage.waitForOrderList();
    await orderHistPage.searchAndViewOrder()
    
    //OrderSumary Page
    const orderSummaryPage = poManager.getOrderSummaryPage(page)
    orderSummaryPage.waitForOrderSummary();
    await expect(orderSummaryPage.orderId).toHaveText(orderID);
});
}