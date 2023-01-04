import axios from "axios"


async function giveMenuCode(req, res){
try {
    
// JUST USE THE #, YEAR
let date = new Date()
let menuCodesForToday = [
    {name: "Rand Dining Center",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "The Commons Dining Center",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "The Kitchen at Kissam",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "The Pub at Overcup Oak",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Suzie's Food for Thought Cafe",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Suzie's Blair School of Music",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Suzie's MRB III",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Grins Vegetarian Cafe",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Suzie’s Featheringill",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null,
    },
    {name: "E. Bronson Ingram Dining Center",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null,
    },
    {name: "2301",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Rand Grab & Go Market",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Commons Munchie",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Branscomb Munchie",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Kissam Munchie",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Highland Munchie",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Local Java Cafe at Alumni",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Zeppos Dining",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Rothschild Dining Center - Contains Peanuts & Treenuts",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    },
    {name: "Rothschild Munchie",
    breakfast: null,
    lunch: null,
    dinner: null,
    dailyofferings: null, hasMenuCodes: null
    }
]
for(let i = 1; i < 21; ++i){
    var options = {
        method: 'POST',
        url: 'https://netnutrition.cbord.com/nn-prod/vucampusdining/Unit/SelectUnitFromUnitsList',
        headers: {
          cookie: 'ASP.NET_SessionId=bhgr5czbav0ldd25htvmnrtf; CBORD.netnutrition2=NNexternalID%3Dvucampusdining',
          'Content-Type': 'application/x-www-form-urlencoded'
        } , 
        data: {unitOid: i.toString()}
      };
      
      await axios.request(options).then(function (response) {
        let htmlString = response.data.panels[3].html.toString()
        if(htmlString.indexOf(menuCodesForToday[i-1].name) === -1){
            menuCodesForToday[i-1].breakfast = "NA"
            menuCodesForToday[i-1].lunch = "NA"
            menuCodesForToday[i-1].dinner = "NA"
            menuCodesForToday[i-1].dailyofferings = "NA"
            menuCodesForToday[i-1].hasMenuCodes = "ERROR"
        } else{
            htmlString = htmlString.substring(htmlString.indexOf(menuCodesForToday[i-1].name) + menuCodesForToday[i-1].name.length)
            
            if(htmlString.indexOf("There are no menus available for this location.") != -1){
                menuCodesForToday[i-1].breakfast = "NA"
                menuCodesForToday[i-1].lunch = "NA"
                menuCodesForToday[i-1].dinner = "NA"
                menuCodesForToday[i-1].dailyofferings = "NA"
                menuCodesForToday[i-1].hasMenuCodes = "FALSE"
            } else{
                //console.log(i+ htmlString)
                // make sure the current day is valid
                let checkString = date.getUTCDate() + ", " + date.getFullYear()
                // switch back to check string
                if(htmlString.indexOf(checkString) === -1){
                    menuCodesForToday[i-1].breakfast = "NA"
                    menuCodesForToday[i-1].lunch = "NA"
                    menuCodesForToday[i-1].dinner = "NA"
                    menuCodesForToday[i-1].dailyofferings = "NA"
                    menuCodesForToday[i-1].hasMenuCodes = "FALSE"
                } else{
                    // the current date exists
                    htmlString = htmlString.substring(htmlString.indexOf(checkString) + checkString.length)
                    // string without the date and the other links

                    // possible isolate from the rest? check for <div class='card-block'>
                    if(htmlString.indexOf("<div class='card-block'>") === -1){
                        // means last day for this dining hall option
                        //console.log(i + "LAST:" + htmlString)
                    } else{
                        // means more days and isolate
                        htmlString = htmlString.substring(htmlString.indexOf(0,"<div class='card-block'>"))
                        //console.log(i + "LAST:" + htmlString)
                    }
                    // Look for: "Breakfast", "Lunch", "Dinner", "Daily Offerings"
                    // then go through it and check if it has the word, then get that menu if not go to the next word
                    if(htmlString.indexOf("Breakfast") !== -1){
                        // breakfast exists
                        menuCodesForToday[i-1].hasMenuCodes = "TRUE"
                        let codeString = htmlString.substring((htmlString.indexOf("menuListSelectMenu(")+19))
                        menuCodesForToday[i-1].breakfast = codeString.substring(0,7)
                        //console.log("menuCode: " +  codeString.substring(0,7))
                        htmlString = htmlString.substring(htmlString.indexOf("Breakfast")+9)
                    }
                    if(htmlString.indexOf("Lunch") !== -1){
                        // lunch exists
                        menuCodesForToday[i-1].hasMenuCodes = "TRUE"
                        let codeString = htmlString.substring((htmlString.indexOf("menuListSelectMenu(")+19))
                        menuCodesForToday[i-1].lunch = codeString.substring(0,7)
                        //console.log("menuCode: " +  codeString.substring(0,7))
                        htmlString = htmlString.substring(htmlString.indexOf("Lunch")+9)
                    }
                    if(htmlString.indexOf("Dinner") !== -1){
                        // lunch exists
                        menuCodesForToday[i-1].hasMenuCodes = "TRUE"
                        let codeString = htmlString.substring((htmlString.indexOf("menuListSelectMenu(")+19))
                        menuCodesForToday[i-1].dinner = codeString.substring(0,7)
                        //console.log("menuCode: " +  codeString.substring(0,7))
                        htmlString = htmlString.substring(htmlString.indexOf("Lunch")+9)
                    }
                    if(htmlString.indexOf("Daily Offerings") !== -1){
                        // lunch exists
                        menuCodesForToday[i-1].hasMenuCodes = "TRUE"
                        let codeString = htmlString.substring((htmlString.indexOf("menuListSelectMenu(")+19))
                        menuCodesForToday[i-1].dailyofferings = codeString.substring(0,7)
                        //console.log("menuCode: " +  codeString.substring(0,7))
                        htmlString = htmlString.substring(htmlString.indexOf("Lunch")+9)
                    }
                }
            }

        }

      }).catch(function (error) {
        console.error(error);
      });
}
    return menuCodesForToday
} catch (error) {
    console.log(error)
    throw error
}
}


console.log(await giveMenuCode())

 