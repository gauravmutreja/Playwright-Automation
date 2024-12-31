export class OrdersPage {

    constructor(page) {
        this.page = page;
        this.cardNumberTextbox = page.locator(".payment__cc .text-validated");
        this.cvvNumber = page.locator("div:nth-child(2) .field.small:nth-child(2) input");
        this.monthDropdown = page.locator("select").first();
        this.dayDropdown = page.locator("select").nth(1);
        this.coupon = page.locator("[name='coupon']");
        this.applyCouponbtn = page.locator("button[type='submit']");
        this.countryTextbox = page.locator("[placeholder*='Country']")
        this.dropdownCountry = page.locator(".ta-results [type='button']",);
        this.checkCoupon = page.locator(".field.small p");        
        this.btnPlaceOrder = page.locator(".action__submit");
        this.username = page.locator(".user__name label");
    }

     async fillCardDetails(cardDetails) {
        await this.monthDropdown.selectOption(cardDetails.month);
        await this.dayDropdown.selectOption(cardDetails.day);
        await this.cardNumberTextbox.fill(cardDetails.cardNumber);
        await this.cvvNumber.fill(cardDetails.cvv);
    }

    async applyCoupon(couponCode){
        await this.coupon.fill(couponCode) ;
        await this.applyCouponbtn.click();
    }

    async selectCountry(countryName) {
        await this.countryTextbox.pressSequentially(countryName);
        await dropdownCountry.first().waitFor();
        for (let i = 0; i < await dropdownCountry.count(); i++) {
            let text = await dropdownCountry.nth(i).textContent();
            if (text.trim() === "India") {
                await dropdownCountry.nth(i).click();
                break;
            }
        }

    }

    async placeOrder(){
        await this.btnPlaceOrder.click();
    }

    

}