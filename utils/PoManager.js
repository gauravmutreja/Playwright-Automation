import { LoginPage } from "../pageobjects/LoginPage.js";
import { DashboardPage } from "../pageobjects/DashboardPage.js";
import { CartPage } from "../pageobjects/CartPage.js";
import { OrdersPage } from "../pageobjects/OrdersPage.js";
import { ThankYouPage } from "../pageobjects/ThankYouPage.js";
import { OrderHistroyPage } from "../pageobjects/OrderHistoryPage.js";
import { OrderSummaryPage } from "../pageobjects/OrderSummaryPage.js";

export class PoManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
        this.thankYouPage = new ThankYouPage(page)
        this.orderHistPage = new OrderHistroyPage(page)
        this.orderSummaryPage = new OrderSummaryPage(page)
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashBoardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }

    getThankYouPage() {
        return this.thankYouPage;
    }

    getOrderHistPage() {
        return this.orderHistPage;
    }

    getOrderSummaryPage() {
        return this.orderSummaryPage;
    }

}