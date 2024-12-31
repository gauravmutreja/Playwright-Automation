import { test, expect } from "playwright/test"

test("Calender Validations", async ({ page }) => {
    const month = "6";
    const day = "19";
    const year = "2030";
    const expectedDate = [month, day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year, { exact: true }).click();
    //await page.getByRole("button",{name:year,exact:"true"}).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    // await page.getByRole("button",{name:"June"}).click();
    await page.locator("//abbr[text()='" + day + "']").click();
    // await page.getByRole("button",{name:day}).click();

    // const selectedDate = page.locator(".react-date-picker__inputGroup [name='date']").getAttribute("value");
    // console.log(selectedDate);

    const inputDate = page.locator(".react-date-picker__inputGroup input");
    for (let i = 0; i < inputDate.length; i++) {
        const value = inputDate[i]  
    }
});