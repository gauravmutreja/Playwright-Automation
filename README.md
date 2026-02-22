# Playwright Automation

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.40%2B-blue?logo=playwright)](https://playwright.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A production-ready Playwright test automation framework with **Page Object Model (POM)**, **parametrized tests**, **API testing**, and **BDD support**.

---

## Quick Start

```bash
# Install dependencies
npm install && npx playwright install

# Run all tests
npm test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/ecom-ui/LoginPractiseFlow.spec.js

# Debug mode (interactive)
npx playwright test --debug

# Run tests by tag
npx playwright test --grep "@smoke"
```

---

## Project Contents

### 📁 Structure
```
pageobjects/          Page Object classes (LoginPage, ShopPage, DashboardPage, etc.)
tests/                Test suites (UI, API, BDD)
test-data/           JSON test data files for parametrized tests
utils/               PoManager, APIUtils, helpers
features/            Cucumber feature files & step definitions
```

### 🧪 Test Types
- **UI Tests**: Login flows, form interactions, e-commerce checkout
- **API Tests**: REST API validation with test utilities
- **BDD Tests**: Cucumber feature files with step definitions
- **Parametrized Tests**: Multiple test cases from JSON datasets

---

## Key Features

✅ **Page Object Model** - Centralized page interactions via `PoManager`
✅ **Parametrized Tests** - Run same test with multiple datasets
✅ **Cross-Browser** - Chromium, Firefox, WebKit
✅ **API + UI Testing** - Combined test scenarios
✅ **Test Data Management** - JSON-based test data
✅ **Allure Reports** - Detailed visual reports
✅ **BDD (Cucumber)** - Feature-driven testing
✅ **CI/CD Ready** - Trace, screenshots, artifacts

---

## Useful Commands

### Test Execution
```bash
npm test                                        # Run all tests
npm run regression                              # All tests (if defined)
npm run APITest                                 # API tests only
npm run UITests                                 # UI tests only
npm run safariConfig                            # Run on Safari

npx playwright test --headed                   # Show browser
npx playwright test --debug                    # Debug mode
npx playwright test --headed --workers=1       # Single worker
npx playwright test -g "@smoke"                # Run tagged tests
npx playwright test --project=chromium         # Specific browser
npx playwright test --update-snapshots         # Update screenshots
```

### Reporting
```bash
npx playwright test --reporter=list            # List format
npx playwright show-report                     # View HTML report
npx playwright test --reporter=allure-playwright
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report
```

### Code Generation & Debugging
```bash
npx playwright codegen https://example.com     # Record test
npx playwright test --trace=on                 # Capture traces
npx playwright show-trace test-results/.../trace.zip
```

---

## Using Page Objects & PoManager

### Example Test
```javascript
import { test, expect } from "@playwright/test";
import { PoManager } from "../../utils/PoManager.js";
import dataset from "../../test-data/LoginPractiseTestData.json";

for (const data of dataset) {
    test(`Login and verify ${data.productName}`, async ({ page }) => {
        const poManager = new PoManager(page);
        
        const loginPage = poManager.getLoginPagePractise();
        await loginPage.goToPage();
        await loginPage.validLogin(data.username, data.password);
        
        const shopPage = poManager.getShopPage();
        const exists = await shopPage.verifyProductExists(data.productName);
        expect(exists).toBe(true);
    });
}
```

### Parametrized Test Data
```json
// test-data/LoginPractiseTestData.json
[
    { "username": "user1", "password": "pass1", "productName": "iphone X" },
    { "username": "user2", "password": "pass2", "productName": "Samsung Note 8" }
]
```

---

## npm Scripts

```json
{
  "scripts": {
    "test": "npx playwright test",
    "regression": "npx playwright test",
    "APITest": "npx playwright test --grep @API",
    "UITests": "npx playwright test --grep @UI",
    "safariConfig": "npx playwright test --config playwright.config1.js --project=safari"
  }
}
```

---

## BDD / Cucumber Tests

```bash
# Run feature files
npx cucumber-js

# Run with tags
npx cucumber-js --tags "@Validation"

# Parallel execution
npx cucumber-js --parallel 2

# Generate HTML report
npx cucumber-js --format html:cucumber-report.html
```

---

## Configuration

- **playwright.config.js** - Default (Chromium, Firefox, WebKit)
- **playwright.config1.js** - Safari-specific config
- **Browsers**: Installed automatically via `npx playwright install`
- **Headless**: Set to `true` by default; use `--headed` flag to view

---

## Best Practices

✅ Use Page Objects for all page interactions
✅ parametrize tests for multiple scenarios
✅ Use meaningful locators (`getByRole`, `getByLabel` > XPath)
✅ Externalize test data (JSON files)
✅ Use proper waits (`waitForLoadState`, `waitForURL`)
✅ Tag tests for selective execution (`@smoke`, `@regression`)
✅ Run tests in CI/CD with artifacts enabled

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Browser not installed | `npx playwright install` |
| Element not found | Use better locators; check selectors |
| Timeout waiting | Increase timeout; check waits |
| Tests fail in CI but pass locally | Run with `--headed=false`; check vars |
| Browser crashed | `npx playwright install-deps` |

---

## Resources

- [Playwright Docs](https://playwright.dev/)
- [Locators Guide](https://playwright.dev/docs/locators)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)

---

## License

MIT License - See LICENSE file

---

**Author**: Gaurav Mutreja | **GitHub**: [@gauravmutreja](https://github.com/gauravmutreja)


