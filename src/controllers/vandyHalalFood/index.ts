import { Response, Request } from "express";
import { chromium } from "playwright";
import HtmlTableToJson from "./HtmlTableToJson";



async function getHalalFood(req: Request, res: Response) {
  try {
    const results: any = [
      {
        diningHall: "Rand Dining Center",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "2301",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "The Pub at Overcup Oak",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "The Commons Dining Center",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "The Kitchen at Kissam",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "E. Bronson Ingram Dining Center",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "Rothschild Dining Center - Contains Peanuts & Treenuts",
        message: "",
        foodInformation:undefined
      },
      {
        diningHall: "Zeppos Dining",    
        message: "",
        foodInformation:undefined
      },
    ];
    
    const date = new Date
    // Rand Dining Hall, 2301, Pub
    if(date.getDay() === 0 || date.getDay() === 6){
      results[0].message = "CLOSED"
      results[1].message = "CLOSED"
      results[2].message = "CLOSED"
    }
    for(let i = 3; i < results.length; i++){
      results[i].message = "OPEN"
      results[i].foodInformation = await scraping(results[i].diningHall)
    }

    console.log(await results)
    res.status(200).json(results)

    
  } catch (error) {
    console.log(error);
    throw error;
  } 
}



async function scraping(diningHallName: string) {
  try {
    const information = {
        message:"",
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
    const bhtml = await page.content();
    if (bhtml.indexOf("Item Name") === -1) {
      console.log(diningHallName + ": BREAKFAST HAS NO ITEMS");
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

          const jsonTables = HtmlTableToJson.parse(nhtml, { values: false });
          console.log(diningHallName + ": "+ jsonTables.results);
          information.Breakfast.food = jsonTables.results
        });
    }
    
    // Lunch
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByRole("link", { name: "Lunch" }).click();
    await page.waitForTimeout(5000);
    const lhtml = await page.content();
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

          const jsonTables = HtmlTableToJson.parse(nhtml, { values: false });
          console.log(diningHallName +": " + jsonTables.results);
          information.Lunch.food = jsonTables.results
        });
    }


    // Brunch
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByTitle("Brunch").click();
    await page.waitForTimeout(5000);
    const brhtml = await page.content();
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

          const jsonTables = HtmlTableToJson.parse(nhtml, { values: false });
          console.log(jsonTables.results);
          information.Brunch.food = jsonTables.results
        });
    }

    // Dinner
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByTitle("Dinner").click();
    await page.waitForTimeout(5000);
    const dhtml = await page.content();
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

          const jsonTables = HtmlTableToJson.parse(nhtml, { values: false });
          console.log(jsonTables.results);
          information.Dinner.food = jsonTables.results
        });
    }

    // Daily Offerings
    await page.getByTitle("Selected Meal: Show All Meals").click();
    await page.getByTitle("Daily Offerings").click();
    await page.waitForTimeout(5000);
    const dOhtml = await page.content();
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

              const jsonTables = HtmlTableToJson.parse(nhtml, { values: false });
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















export {getHalalFood}