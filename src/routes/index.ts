import express from "express"
import {getUserTimesAndUpdate, addUserTimesAndUpdate, updateIqamahTime, deleteIqamahTime, getTodayPrayerTime} from "./../controllers/prayertimesjummahupdate"
import { getVandyHalalFood, getHalalRestaurants, addHalalRestaurant, updateHalalRestaurant, deleteHalalRestaurant } from "../controllers/food";
import { getCalendarEvents } from "../controllers/calendar";
import { getPictures, addPicture, updatePicture, deletePicture } from "../controllers/pictures";
const router = express.Router();

// Instagram Posts

// Picture Routes
router.get("/getPictures", getPictures)
router.post("/addPicture", addPicture)
router.put("/updatePicture/:id", updatePicture)
router.delete("/deletePicture/:id", deletePicture)

// Calendar Routes
router.get("/getMSAEvents", getCalendarEvents)

// food routes
router.get("/getHalalFood", getVandyHalalFood)

// CRUD operations for Halal Restaurants
router.get("/getHalalRestaurants", getHalalRestaurants)
router.post("/addHalalRestaurant", addHalalRestaurant)
router.put("/updateHalalRestaurant/:id", updateHalalRestaurant)
router.delete("/deleteHalalRestaurant/:id", deleteHalalRestaurant)

// get prayerTimes
router.get("/prayerTimes", getTodayPrayerTime)
// CRUD operations for Iqamah, Jummah, and Jummah Updates 
router.get("/userTimes", getUserTimesAndUpdate)
router.post("/add-userTime", addUserTimesAndUpdate)
router.put("/edit-userTime/:id",updateIqamahTime)
router.delete("/delete-userTime/:id", deleteIqamahTime)


export default router