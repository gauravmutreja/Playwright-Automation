# Playwright-Automation
.
## Tutorials Index
1. [UI Basic Tests](tests/UIBasicTest.spec.js)
    * Basic test to open google website.
    * Login test.
    * UI Controls test.
    * UI Child Window Handling test.
    * UI Popup Validations test.
    * UI Screenshot Validation test.
    * UI Visual Comparison test.
2. [Calender Validation Test](tests/Calender.spec.js)
3. [E2E Test - checkout a product from an ecommerce website](tests/ClientApp.spec.js)
4. [E2E Test using Page Object Model](tests/ClientApp-PO.spec.js)
5. [Learn different getBy locators in playwright](tests/SpecialLocators.spec.js)
6. [Web + API Testing combination](tests/WebAPIPart1.spec.js)
7. [Web + API Testing combination using Utils](tests/WebAPIwithUtil.spec.js)
<hr/>

## Useful terminal commands 
### When starting a fresh playwright project 
    1. install node (brew install node)
    2. install playwright (npm init playwright)

### If cloning existing project install all dependencies using - 
    npm install

### Execute all the tests using - 
    npx playwright test 

### Execute tests in specific file using - 
    npx playwright test <test-file>
    Example: 
    npx playwright test tests/login-test.spec.js

### Execute tests with matching regex in any file using - 
    npx playwright test --grep <partial name of the test>
    Example: 
    npx playwright test --grep 'UI'

### Debug tests using debug flag - 
    npx playwright test <test-file> --debug 
    Example: 
    npx playwright test --grep 'UI'

### Run required tests from the playwright test runner - 
    npx playwright test --ui 

### Record and generate test script for any website url 
    npx playwright codegen <URL of the website>
    Example: 
    npx playwright codegen https://google.com/

### View traces locally 
    npx playwright show-trace <path to the traces.zip file>
    Example: 
    npx playwright show-trace ./test-results/open-google-test-open-google-page/trace.zip

### To initialise new project
npx init playwright
npx playwright test --headed
npx playwright test --debug :### to start test in debug mode
npx playwright test --ui

** Fixtures are global variable available across project

page.title() : ###To return page's title
Page.locator.textContent() : ###To extract the content of the locator
Pl.isChecked(): ###If checked will return true else false
Pl.uncheck(): ###To uncheck
Pl("text = Add To Cart") : ###Locator based on text
Pl("h3:has-text('Zara Coat 4 ')") : ###Find element based on text and has given tag
Pl.isVisible(): ###Returns true if element is visible else returns false
 



###To get first element: .first();
    Last element : .last();
    Particular element: nth(0);
    
#Wait: 
Page.waitForLoadState('networkIdle'); : Page will wait untill all netowork call are made and network reaches an idle state.
Page.locator().first().waitfor(); : Waiting till that element is loaded

#Expect:
expect(pl).toBeChecked() : Asserts input is checked or unchecked if {checked: false} is passed.
expect.toBeFalsy(); To check value returned is false
expect.toBeTruthy(); To check value returned is true
expect.toHaveAttribute(name,value). Eg: ('type','text') : Ensures attribute is present for that locator
expect.toHaveText(""): ensures element has the given text
expect(pl).toContainText("Incorrect") : To check element contains the given text.
expect(page).toHaveTitle('Google'); // check title




#Project Configuratoins:
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

#Allure Reporting
npm install -D allure-playwright
npx playwright test --reporter=line,allure-playwright //convert report from line to allure folder
allure generate ./allure-results --clean // to generate report
allure open ./allure-report //to open report

#Script
Write script inside package.jason
eg: "scripts": {
    "regression":"npx playwright test",
    "APITest":"npx playwright test --grep @API",
    "UITests":"npx playwright test --grep @UI",
    "safariConfig":"npx playwright test --config playwright.config1.js --project=safari"
  },
  Then run those test using command: npm run APITest (i.e. scriptName)
  same for cucumber scripts : npm run CucumberRegression

#Cucumber
npx cucumber-js : to run your feature file

npx cucumber-js --exit : to run your feature file and exit out of terminal once execution is over

npx cucumber-js features/ErrorValidations.feature --exit: To explicitly run only that single feature file

npx cucumber-js --tags "@Validation" --exit : will run only those scenario's which are tagged with the mentioned tag.

npx cucumber-js features/EcommerceValidation.feature --parallel 2 --exit : Means go that feature file and execute 2 scenario's parallely at a time
** We can run multiple scenarios parallelly but cannot run feature files parallely


npx cucumber-js --exit --format html:cucumber-report.html: Generate report in html format and cucumber-report.html will be the file name. after execution refresh and cucumber-report.html will be generated. copy path and paste it on browser

npx cucumber-js --tags "Regression" --retry 1 --exit --format html:cucumber-report.html: Cucumber will try to run scenarios untill it passes or given no. of attempts is reached.
If passed after rerun , Report will not mention how many times it ran , it will only mention passed.

