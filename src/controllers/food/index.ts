import {Request, Response} from "express"
import axios from "axios"
import { halalRestaurant } from "../../types/halalRestaurant"
import HalalRestaurants from "../../models/halalRestaurant"

// function to send all the Vegertarian food 

// function to send all the Vegan

// function to send all the halal food

async function getVandyHalalFood(req: Request, res: Response){
    try{
        // first get all of the dining hall foods [1,20]
        // store the codes of each dining hall
        const validMenuCodes = new Array(20)
        const options =  {
            method: 'POST',
            url: 'https://netnutrition.cbord.com/nn-prod/vucampusdining/Unit/SelectUnitFromUnitsList',
            headers: {
                cookie: 'ASP.NET_SessionId=bhgr5czbav0ldd25htvmnrt; CBORD.netnutrition2=NNexternalID%3Dvucampusdining',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            data: {unitOid: '2'}
          };
          
        // no/ await  
        await axios.request(options).then(function (response) {
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

// read
async function getHalalRestaurants(req: Request, res: Response){
    try {
        const allHalal: halalRestaurant[] = await HalalRestaurants.find()

        res.status(200).json({"message":"Halal Restaurants sent successfully", "allRestaurants": allHalal})

    } catch (error) {
        console.log(error)
        throw error
    }
}
// create
async function addHalalRestaurant(req: Request, res: Response){
    try {
        const body = req.body as Pick< halalRestaurant,"name" | "address" | "note" | "website" | "onMealMoney" | "imageUrl">
        const restaurantToBeAdded: halalRestaurant = new HalalRestaurants({
            "name": body.name,
            "address": body.address,
            "note": body.note,
            "website": body.website,
            "onMealMoney": body.onMealMoney,
            "imageUrl": body.imageUrl
        })
        const added: halalRestaurant = await restaurantToBeAdded.save()
        const allRestaurants: halalRestaurant[] = await HalalRestaurants.find()

        res.status(200).json({"message":"Halal Resturant successfully added", "Added Restaurant": added, "All Resturants": allRestaurants})
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function updateHalalRestaurant(req: Request, res: Response){
    try {
        const body = {"id": req.params.id, "body": req.body}
        const updated: halalRestaurant | null = await HalalRestaurants.findByIdAndUpdate({_id: body.id}, {$set: body.body})
        const all: halalRestaurant[] = await HalalRestaurants.find()

        res.status(200).json({"message":"Halal Restaurant successfully updated", "Updated Restaurant": updated, "All Restaurants": all})

    } catch (error) {
        console.log(error)
        throw error
    }
}

async function deleteHalalRestaurant(req: Request, res: Response){
    try {
        const body = {"id": req.params.id, "body": req.body}
        const deleted: halalRestaurant | null = await HalalRestaurants.findByIdAndDelete(body.id, body.body)
        const all: halalRestaurant[] = await HalalRestaurants.find()
        res.status(200).json({"message":"Halal Resturant successfully deleted", "Deleted Restaurant": deleted, "All Resturants": all})

    } catch (error) {
        console.log(error)
        throw error
    }
}






export {getVandyHalalFood, getHalalRestaurants, addHalalRestaurant, updateHalalRestaurant, deleteHalalRestaurant}