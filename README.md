# Playwright-Automation

npx init playwright: to initialise new project
npx playwright test --headed
npx playwright test --debug : to start test in debug mode

Fixtures are global variable available across project
Page.locator.textContent() : to extract the content of the locator
Pl.isChecked(): if checked will return true else false
Pl.uncheck(): to uncheck
Pl("text = Add To Cart") : Locator based on text
Pl("h3:has-text('Zara Coat 4 ')") : find element based on text and has given tag
Pl.isVisible(): returns true if element is visible else returns false
 



To get first element: .first();
    Last element : .last();
    Particular element: nth(0);
    
Wait: 
Page.waitForLoadState('networkIdle'); : Page will wait untill all netowork call are made and network reaches an idle state.
Page.locator().first().waitfor(); : Waiting till that element is loaded

Expect:
Expect(pl).toContainText(" ") : check if given locator contains the given text
Expect(pl).toBeChecked() : Asserts input is checked or unchecked if {checked: false} is passed.
Expect.toBeFalsy(); To check value returned is false
Expect.toBeTruthy(); To check value returned is true
Expect.toHaveAttribute(name,value). Eg: ('type','text') : Ensures attribute is present for that locator
Expect.toHaveText(""): ensures element has the given text


Project Configuratoins:
Const config: {
    testDir: './tests',
    Retries: 5, // it means test will retry to run 5 times incase of failure
}
 
Projects: [
    {
        Name:'safari'
        Use: {
            browserName: 'webkit',
            Headless: true,
            Screeshot: 'only-on-failure'
            Video: 'off' / 'on' / 'retain-on-failure' / on-first-retry',
            Trace: 'on',
            ignoreHttpsErrors: 'true', //incase website is not SSl it will be handled.
            Permissions: ['geolocation'], // any pop-up for knowing your location will be handled
            Viewport: {width:720, height:720},  //in which size should browser open
            
            …devices['iPhone 11'],   //instead of a particular size we can mention for which device. In that case don’t provide viewport.
        }
    },
    {
        Name:'chrome'
        Use: {
            browserName: 'chromium',
            Headless: false,
            Screeshot: 'off'
            Trace: 'on'
        }
    }
    
]
npx playwright test tests/ClientApp.spec.js --config playwright.config1.js --project=safari
