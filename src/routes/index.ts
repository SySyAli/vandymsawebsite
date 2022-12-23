import express from "express"
import {getUserTimesAndUpdate, addUserTimesAndUpdate, updateIqamahTime, deleteIqamahTime, getTodayPrayerTime} from "./../controllers/prayertimesjummahupdate"
import { getVandyHalalFood } from "../controllers/food";
const router = express.Router();

// food routes
router.get("/getHalalFood", getVandyHalalFood)

// get prayerTimes
router.get("/prayerTimes", getTodayPrayerTime)

// CRUD operations for Iqamah, Jummah, and Jummah Updates 

router.get("/userTimes", getUserTimesAndUpdate)
router.post("/add-userTime", addUserTimesAndUpdate)
router.put("/edit-userTime/:id",updateIqamahTime)
router.delete("/delete-userTime/:id", deleteIqamahTime)


export default router