// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /*Maximum time on test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000 // time out for each assertion
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  projects:[
    { 
      name:'chrome',
      use: {
        browserName: 'chromium',
        headless : false,
        trace: 'retain-on-failure'  , //off, on
        screenshot: 'only-on-failure',//off, on
        video: 'retain-on-failure', //record video,
        viewport: {width:240, height:720},
        ignoreHTTPSErrors:true, //will allow you to access even if the website is not ssl certified
        permissions:['Geolocation'] //automatically handle pop up asking your location
      }
    },
    { 
      name:'safari',
      use: {
        browserName: 'webkit',
        headless : false,
        trace: 'retain-on-failure'  , //off, on
        screenshot:  'only-on-failure',
        ...devices['iPhone 15 Pro']
      }
    }
  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  

});

