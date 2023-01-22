import { chromium, devices } from "playwright";
import { parse } from "node-html-parser";
import HtmlTableToJson from "html-table-to-json";

const results = [
  {
    diningHall: "Rand Dining Center",
    foodInformation:{}
  },
  {
    diningHall: "2301",
    foodInformation:{}
  },
  {
    diningHall: "The Pub at Overcup Oak",
    foodInformation:{}
  },
  {
    diningHall: "The Commons Dining Center",
    foodInformation:{}
  },
  {
    diningHall: "The Kitchen at Kissam",
    foodInformation:{}
  },
  {
    diningHall: "E. Bronson Ingram Dining Center",
    foodInformation:{}
  },
  {
    diningHall: "Rothschild Dining Center - Contains Peanuts & Treenuts",
    foodInformation:{}
  },
  {
    diningHall: "Zeppos Dining",
    foodInformation:{}
  },
];

//


scraping("E. Bronson Ingram Dining Center");

async function scraping(diningHallName) {
  try {
    let information = {
        Breakfast: { message: "", food: {} },
        Lunch: { message: "", food: {} },
        DailyOffering: { message: "", food: {} },
        Dinner: { message: "", food: {} },
        Brunch: { message: "", food: {} },
      }


    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://netnutrition.cbord.com/nn-prod/vucampusdining");

    // add rand code to test see if current test code works first on weekends
    await page.getByRole("button", { name: "Only show Halal" }).click();

    // Set location
    await page.getByTitle("Selected Location: Show All Units").click();
    await page.getByTitle(diningHallName).click();

    // Set Date to Today
    await page.getByRole("link", { name: " Today" }).click();
    await page.getByTitle("Today").click();

    // Breakfast
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByRole("link", { name: "Breakfast" }).click();
    await page.waitForTimeout(5000);
    let bhtml = await page.content();
    if (bhtml.indexOf("Item Name") === -1) {
      console.log(diningHallName + "BREAKFAST HAS NO ITEMS");
      information.Breakfast.message = "BREAKFAST HAS NO ITEMS"
    } else {
      const buttons = [];
      console.log(diningHallName + "BREAKFAST HAS ITEMS");
      information.Breakfast.message = "BREAKFAST HAS ITEMS"
      /* Code that will get table of halal items */
      await page
        .evaluate(() => {
          const testElements = document.getElementsByClassName(
            "cbo_nn_itemGroupRow"
          );
          const testDivs = Array.prototype.filter.call(
            testElements,
            (testElement) => testElement.click()
          );
        })
        .then(async () => {
          const newTable = await page.content();
          const nhtml = newTable.substring(
            newTable.indexOf('<div class="table-responsive pt-3"'),
            newTable.indexOf("</table>") + 8
          );

          const root = parse(nhtml);
          const jsonTables = HtmlTableToJson.parse(nhtml);
          console.log(diningHallName + ": "+ jsonTables.results);
          information.Breakfast.food = jsonTables.results
        });
    }

    // Lunch
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByRole("link", { name: "Lunch" }).click();
    await page.waitForTimeout(5000);
    let lhtml = await page.content();
    if (lhtml.indexOf("Item Name") === -1) {
      console.log(diningHallName + " LUNCH HAS NO ITEMS");
      information.Lunch.message = "LUNCH HAS NO ITEMS"
    } else {
      const buttons = [];
      console.log(diningHallName + " LUNCH HAS ITEMS");
      information.Lunch.message = "LUNCH HAS ITEMS"
      /* Code that will get table of halal items */
      await page
        .evaluate(() => {
          const testElements = document.getElementsByClassName(
            "cbo_nn_itemGroupRow"
          );
          const testDivs = Array.prototype.filter.call(
            testElements,
            (testElement) => testElement.click()
          );
        })
        .then(async () => {
          const newTable = await page.content();
          const nhtml = newTable.substring(
            newTable.indexOf('<div class="table-responsive pt-3"'),
            newTable.indexOf("</table>") + 8
          );

          const root = parse(nhtml);
          const jsonTables = HtmlTableToJson.parse(nhtml);
          console.log(diningHallName +": " + jsonTables.results);
          information.Lunch.food = jsonTables.results
        });
    }


    // Brunch
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByTitle("Brunch").click();
    await page.waitForTimeout(5000);
    let brhtml = await page.content();
    if (brhtml.indexOf("Item Name") === -1) {
      console.log("BRUNCH HAS NO ITEMS");
      information.Brunch.message = "BRUNCH HAS NO ITEMS"
    } else {
      const buttons = [];
      console.log("BRUNCH HAS ITEMS");
      information.Brunch.message = "BRUNCH HAS ITEMS"
      /* Code that will get table of halal items */
      await page
        .evaluate(() => {
          const testElements = document.getElementsByClassName(
            "cbo_nn_itemGroupRow"
          );
          const testDivs = Array.prototype.filter.call(
            testElements,
            (testElement) => testElement.click()
          );
        })
        .then(async () => {
          const newTable = await page.content();
          const nhtml = newTable.substring(
            newTable.indexOf('<div class="table-responsive pt-3"'),
            newTable.indexOf("</table>") + 8
          );

          const root = parse(nhtml);
          const jsonTables = HtmlTableToJson.parse(nhtml);
          console.log(jsonTables.results);
          information.Brunch.results = jsonTables.results
        });
    }

    // Dinner
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByTitle("Dinner").click();
    await page.waitForTimeout(5000);
    let dhtml = await page.content();
    if (dhtml.indexOf("Item Name") === -1) {
      console.log("DINNER HAS NO ITEMS");
      information.Dinner.message = "DINNER HAS NO ITEMS"
    } else {
      const buttons = [];
      console.log("DINNER HAS ITEMS");
      information.Dinner.message = "DINNER HAS ITEMS"
      /* Code that will get table of halal items */
      await page
        .evaluate(() => {
          const testElements = document.getElementsByClassName(
            "cbo_nn_itemGroupRow"
          );
          const testDivs = Array.prototype.filter.call(
            testElements,
            (testElement) => testElement.click()
          );
        })
        .then(async () => {
          const newTable = await page.content();
          const nhtml = newTable.substring(
            newTable.indexOf('<div class="table-responsive pt-3"'),
            newTable.indexOf("</table>") + 8
          );

          const root = parse(nhtml);
          const jsonTables = HtmlTableToJson.parse(nhtml);
          console.log(jsonTables.results);
          information.Dinner.food = jsonTables.results
        });
    }

    // Daily Offerings
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByTitle("Daily Offerings").click();
    await page.waitForTimeout(5000);
    let dOhtml = await page.content();
    if (dOhtml.indexOf("Item Name") === -1) {
          console.log("DAILY OFFERINGS HAS NO ITEMS");
          information.DailyOffering.message = "DAILY OFFERINGS HAS NO ITEMS"
    } else {
          const buttons = [];
          console.log("Daily Offerings HAS ITEMS");
          information.DailyOffering.message = "DAILY OFFERINGS HAS ITEMS"
          /* Code that will get table of halal items */
          await page
            .evaluate(() => {
              const testElements = document.getElementsByClassName(
                "cbo_nn_itemGroupRow"
              );
              const testDivs = Array.prototype.filter.call(
                testElements,
                (testElement) => testElement.click()
              );
            })
            .then(async () => {
              const newTable = await page.content();
              const nhtml = newTable.substring(
                newTable.indexOf('<div class="table-responsive pt-3"'),
                newTable.indexOf("</table>") + 8
              );
    
              const root = parse(nhtml);
              const jsonTables = HtmlTableToJson.parse(nhtml);
              console.log(jsonTables.results);
              information.DailyOffering.food = jsonTables.results
            });
    }

    await browser.close();
    return information
  } catch (error) {
    console.log(error);
  }
}
