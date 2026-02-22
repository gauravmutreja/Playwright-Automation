import { expect,test} from '@playwright/test';

test.describe("e2e",()=>{
  test('test1', async ({ page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
    // await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click(); //chaining
    await page.locator("app-card").filter({ hasText: "Samsung Note 8" }).getByRole('button', { name: 'Add' }).click();
    const countText = await page.locator("[class='nav-link btn btn-primary']").textContent();
    expect (countText).toContain('1');
    await page.locator("[class='nav-link btn btn-primary']").click();
    await page.getByRole('button',{name:'Checkout'}).click()
    await page.locator('#country').pressSequentially("Ind");
    await page.waitForSelector(".suggestions a",{state:'visible'});
    // await page.locator(".suggestions a").nth(0).waitFor();
    const countries = await page.locator(".suggestions a").allTextContents();    
    const suggestionLinks = page.locator(".suggestions a");
    console.log("Count",await suggestionLinks.count())

    console.log("Available countries:", countries);
    // await page.locator(".suggestions a", { hasText: "Indonesia" }).click();
     for (let i = 0; i < await suggestionLinks.count(); i++) {
      const text = await suggestionLinks.nth(i).textContent();
      console.log(`Checking suggestion ${i}: "${text}"`);
      
      if (text && text.toLowerCase().includes('indonesia')) {
        await suggestionLinks.nth(i).click();
        break;
      }
    }
    const countryValue = await page.locator("#country").inputValue();
  expect(countryValue).toContain("Indonesia");
  console.log("Selected country:", countryValue);
  });

  test('test2', async ({ page }) => {a
    
  });
});