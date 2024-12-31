import { test, expect } from "@playwright/test"; //to import playwright package for test in our file
// browser is a global fixture that a global variable, need to wrap in {} to define it as playwright fixture 

test('Browser Context Playwright test', async ({ browser }) => {// this part can be written as "async function({browser}){}""

    //Playwright code -
    //As javascript is asynchronous we need to write async before function() 
    //and mention await before each step
    //Chrome - plugin/ cookies

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    const username = page.locator('#username');
    const signIn = page.locator('[type="submit"]');
    //css
    await page.locator('#username').fill("rahulshetty");
    await page.locator('[name="password"]').fill("learning");
    await page.locator('[type="submit"]').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await username.clear()
    await username.fill("rahulshettyacademy");
    await signIn.click();
    const cardTitle = page.locator(".card-body a");
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent()); // second
    console.log(await cardTitle.last().textContent());
    console.log("***************");
    console.log(await cardTitle.allTextContents());

});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https://google.com")
    //get title assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');

});

test("@UI Controls", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    //dropdown
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption('consult')
    //radiobutton
    await page.locator(".customradio").last().click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".customradio").last()).toBeChecked()
    console.log(await page.locator(".customradio").last().isChecked())
    expect(page.locator('.customradio').last().isChecked()).toBeTruthy() //parameter should return true

    // await page.pause()// to Pause execution
    await page.locator("#terms").click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    console.log(await page.locator('#terms').isChecked());
    expect(await page.locator('#terms').isChecked()).toBeFalsy(); //parameter should return false
    const documentLink = page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("@Child Window Handling", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    // Get domain from new page 
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        documentLink.click()
    ]);
    let text = await newPage.locator(".red").textContent();
    const domain = text.split("@")[1].split(".")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").innerText());

});

test("Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    await page.goBack();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
    page.on('dialog', dialog => dialog.accept()); //to accept pop up & dialog.dismiss() to reject
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    //Frames: to switch to frames,  check for tag name: iframe or frame set.
    //To switch , you should have an attribute (name or id) with value containing frame, inside
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("a[href*='lifetime-access']:visible").click();
    console.log(await framesPage.locator("div[class='text'] h2 span").textContent());
    const textCheck = await framesPage.locator("div[class='text'] h2").textContent();
    console.log(textCheck);
    console.log(textCheck.split(" ")[1]);
});