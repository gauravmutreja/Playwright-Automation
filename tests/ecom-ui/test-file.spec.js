import { expect,test} from '@playwright/test';

test("Test-Name", async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://kissanime.com.ru');
  console.log(await page.title());
  
  await browser.close();
});