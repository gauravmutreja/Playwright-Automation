import { LoginPage } from "../pageobjects/LoginPage";
import { DashboardPage } from "../pageobjects/DashboardPage";
import { CartPage } from "../pageobjects/CartPage";
import { OrdersPage } from "../pageobjects/OrdersPage";
import { ThankYouPage } from "../pageobjects/ThankYouPage";
import { OrderHistroyPage } from "../pageobjects/OrderHistoryPage";
import { OrderSummaryPage } from "../pageobjects/OrderSummaryPage";

export class PoManager{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoard = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
        this.thankYouPage = new ThankYouPage(page)
        this.orderHistPage = new OrderHistroyPage(page)
        this.orderSummaryPage = new OrderSummaryPage(page)
    }

    async getLoginPage(){
        return this.loginPage;
    }

    async getDashboardPage(){
        return this.dashBoard;
    }

    async getCartPage(){
        return this.cartPage;
    }

    async getOrdersPage(){
        return this.ordersPage;
    }

    async getThankYouPage(){
        return this.thankYouPage;
    }

    async getOrderHistPage(){
        return this.orderHistPage;
    }

    async getOrderSummaryPage(){
        return this.orderSummaryPage;
    }

}