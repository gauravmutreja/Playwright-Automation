import { chromium } from "@playwright/test";
import { PoManager } from "../../utils/PoManager";
import { Before, After, BeforeAll, AfterStep, BeforeStep, Status } from "@cucumber/cucumber";


Before({tags:"@Validation"},async function () { //Before executes before every scenario whereas BeforeAll executes only once before all scenario's
    //Tags: will execute this hook only for those scenario having given tag. For the rest of the scenario this hook will not execute 
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage(); 
    this.poManager = new PoManager(this.page);
});

After(async function () {
    console.log("This is the last to execute")
});

BeforeStep(async function () { //BeforeStep executes before every step
    
});

BeforeAll(async function () { //BeforeAll executes only once before all scenario's
    
});

AfterStep(async function ({result}) {
    if(result===Status.FAILED){
        await this.page.screenshot({path: '../../features/support/ screenshotfromHooks.png'});
    }
});