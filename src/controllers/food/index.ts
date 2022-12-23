import {Request, Response} from "express"
import axios from "axios"

// function to send all the Vegertarian food 

// function to send all the Vegan

// function to send all the halal food

async function getVandyHalalFood(req: Request, res: Response){
    try{
        // first get all of the dining hall foods [1,20]
        // store the codes of each dining hall
        const validMenuCodes = new Array(20)
        console.log("Hello World1")
        const options = {
            method: 'POST',
            url: 'https://netnutrition.cbord.com/nn-prod/vucampusdining/Unit/SelectUnitFromUnitsList',
            headers: {
              cookie: 'ASP.NET_SessionId=bhgr5czbav0ldd25htvmnrtf; CBORD.netnutrition2=NNexternalID%3Dvucampusdining',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {unitOid: '2'}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });


/*
        for(let i = 20; i >= 0; --i){

            const options = {
                method: 'POST',
                url: 'https://netnutrition.cbord.com/nn-prod/vucampusdining/Unit/SelectUnitFromUnitsList',
                headers: {
                  cookie: 'ASP.NET_SessionId=bhgr5czbav0ldd25htvmnrtf; CBORD.netnutrition2=NNexternalID%3Dvucampusdining',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {unitOid: i.toString()}
              };
              axios.request(options).then(async function (response) {
                validMenuCodes[i-1] = await response.data
              }).catch(function (error) {
                console.error(error);
              });

        }
*/
    res.status(200).json({"message": "halalfoodSent", "codes": validMenuCodes})

    } catch(err){
        console.log(err)
        throw err
    }
}


//CRUD Operations for Halal Places of Campus


export {getVandyHalalFood}