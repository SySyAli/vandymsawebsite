import {Request, Response} from "express"
import { halalRestaurant } from "../../types/halalRestaurant"
import HalalRestaurants from "../../models/halalRestaurant"



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






export {getHalalRestaurants, addHalalRestaurant, updateHalalRestaurant, deleteHalalRestaurant}