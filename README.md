# Playwright Automation

A curated repository to learn and implement effective automation testing using **Playwright**. This project provides a range of example tests, tutorials, configuration options, and integration techniques for both UI and API test automation in JavaScript.

***

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Project Configuration](#project-configuration)  
- [Testing and Assertions](#testing-and-assertions)  
- [Reporting](#reporting)  
- [Scripts and Commands](#scripts-and-commands)  
- [BDD Integration](#bdd-integration)  
- [Contributing](#contributing)  
- [License](#license)  

***

## About

This repository is designed to help developers explore Playwright automation testing with hands-on examples and comprehensive tutorials, covering everything from basic UI tests to advanced end-to-end scenarios, along with API testing integrations.

***

## Features

- Basic UI interaction tests: login, controls, popups, child windows  
- Visual and screenshot validations  
- Calendar widget automation  
- End-to-End flows (e-commerce checkout)  
- Page Object Model (POM) test structure 
- Web API Testing 
- Combining UI and API tests efficiently  
- Utilizing different Playwright locator strategies (`getBy`)  
- Cross-browser support including Chromium and WebKit  
- Integrated Allure reporting  
- Cucumber BDD support for feature-driven tests  

***

## Getting Started

### Prerequisites

- Node.js installed  
- Basic knowledge of JavaScript and asynchronous programming  

### Installation

Clone the repository:

```bash
git clone https://github.com/gauravmutreja/Playwright-Automation.git
cd Playwright-Automation
npm install
```

***

## Usage

### Running Tests

- Run all tests:
  ```bash
  npx playwright test
  ```

- Run a specific test file:
  ```bash
  npx playwright test 
  ```

- Run tests by name or tag using regex:
  ```bash
  npx playwright test --grep ''
  ```

- Debug tests interactively:
  ```bash
  npx playwright test --debug
  ```

- Launch Playwright code generator (record tests):
  ```bash
  npx playwright codegen 
  ```

***

## Project Configuration

- **Test directory:** `./tests`  
- **Retries:** Configurable number of test reruns on failure  
- **Browser projects:**  
  - Chromium (Chrome)  
  - WebKit (Safari)  
- Settings for viewport, permissions, headless mode, trace, and screenshots  

***

## Testing and Assertions

- Wait for elements and network idle with Playwright's `waitForLoadState`  
- Use locators by text, CSS, and advanced Playwright selectors (`getBy`)  
- Assertions include visibility, text content, attribute checks, checkbox states  
- Extract element content for validations  

***

## Reporting

Integrated with Allure for detailed test reports:

```bash
npm install -D allure-playwright

npx playwright test --reporter=line,allure-playwright

allure generate ./allure-results --clean

allure open ./allure-report
```

***

## Scripts and Commands

Defined example npm scripts:

```json
{
  "scripts": {
    "regression": "npx playwright test",
    "APITest": "npx playwright test --grep @API",
    "UITests": "npx playwright test --grep @UI",
    "safariConfig": "npx playwright test --config playwright.config1.js --project=safari"
  }
}
```

Run selected scripts via:

```bash
npm run APITest
```

***

## BDD Integration

Supports Cucumber for behavior-driven tests:

- Run feature files:

  ```bash
  npx cucumber-js
  ```

- Run with tags or parallel execution:

  ```bash
  npx cucumber-js --tags "@Validation" --parallel 2
  ```

- Generate HTML reports:

  ```bash
  npx cucumber-js --format html:cucumber-report.html
  ```

***
