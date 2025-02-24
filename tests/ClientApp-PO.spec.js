import { test, expect } from "@playwright/test";
import { PoManager } from "../utils/PoManager.js";
import dataset from "../test-data/ClientAppTestData.json";

for (const data of dataset) {
test(`@PO: End to End Testing for ${data.productName}`, async ({ page }) => {

    // // Test Data
    //     const username = "gaurav@gmail.com";
    //     const password = "Gaurav@123"
    //     const productName = "ADIDAS ORIGINAL" // product to be added

        const poManager = new PoManager(page);

    //Login
        const loginPage = poManager.getLoginPage();
        await loginPage.goToPage();
        await loginPage.validLogin(data.username, data.password);

    //Dashboard: Search Prod and Add to cart
        const dashBoard = poManager.getDashboardPage();
        await dashBoard.searchAndAddtoCart(data.productName);
        await dashBoard.navigateToCart();

    //Cart Page
        const cartPage = poManager.getCartPage();
        await cartPage.waitForProduct();
        //check cart: if product got added
        await expect(cartPage.getProduct(data.productName)).toBeVisible();
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
        await expect(ordersPage.checkCoupon).toContainText("* Coupon Applied");
        const country = "IND"
        await ordersPage.selectCountry(country);
        await expect(ordersPage.username).toHaveText(data.username);
        await ordersPage.placeOrder();

    //Thankyou page
        const thankYouPage = poManager.getThankYouPage();
        await expect(thankYouPage.thankYouText).toHaveText(" Thankyou for the order. ");
        console.log(await thankYouPage.getOrderId());
        const orderID = await thankYouPage.getOrderId();
        await thankYouPage.goToOrderHistoryPage();

    //Order History Page
        const orderHistPage = poManager.getOrderHistPage();
        await orderHistPage.waitForOrderList();
        await orderHistPage.searchAndViewOrder(orderID)

    //OrderSumary Page
        const orderSummaryPage = poManager.getOrderSummaryPage()
        orderSummaryPage.waitForOrderSummary();
        await expect(orderSummaryPage.orderId).toHaveText(orderID);
    });
}