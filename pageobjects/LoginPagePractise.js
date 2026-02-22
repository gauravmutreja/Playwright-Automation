export class LoginPagePractise {

    constructor(page) {
        this.page = page;
        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.termsCheckbox = page.locator("#terms");
        this.signInButton = page.locator("#signInBtn");
    }

    async goToPage() {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise");
    }

    async enterUsername(username) {
        await this.username.fill(username);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async selectTermsCheckbox() {
        await this.termsCheckbox.check();
    }

    async clickSignIn() {
        await this.signInButton.click();
        await this.page.waitForURL("**/angularpractice/shop");
    }

    async validLogin(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.selectTermsCheckbox();
        await this.clickSignIn();
    }
}
