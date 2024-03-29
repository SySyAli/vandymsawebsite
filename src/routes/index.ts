import express from "express";

import {
	//getUserTimesAndUpdate,
	//addUserTimesAndUpdate,
	//updateIqamahTime,
	//deleteIqamahTime,
	getTodayPrayerTime,
} from "./../controllers/prayertimesjummahupdate";
/*
import {
	getHalalRestaurants,
	addHalalRestaurant,
	updateHalalRestaurant,
	deleteHalalRestaurant,
} from "../controllers/food";
*/
import {
	getCalendarEvents, //getSingleEvent
} from "../controllers/calendar";
import { getInstagramPosts } from "../controllers/instagram";
import { getHalalFoodFromDataBase } from "../controllers/vandyHalalFood";
import { getPictureLinks } from "../controllers/pictures";
const router = express.Router();

// Pictures Links Routes
router.get("/getPhotoLinks", getPictureLinks);

// Instagram Posts
router.get("/getInstagramPosts", getInstagramPosts);
// Calendar Routes
router.get("/getMSAEvents", getCalendarEvents);
//router.get("/getSingleEvent/:id", getSingleEvent);

// food routes
router.get("/getHalalFood", getHalalFoodFromDataBase);

router.get('/', (req, res) => {
	res.send('Hello World!')
  })

/*
// CRUD operations for Halal Restaurants
router.get("/getHalalRestaurants", getHalalRestaurants)
router.post("/addHalalRestaurant", addHalalRestaurant)
router.put("/updateHalalRestaurant/:id", updateHalalRestaurant)
router.delete("/deleteHalalRestaurant/:id", deleteHalalRestaurant)
*/

// get prayerTimes
// CRUD operations for Iqamah, Jummah, and Jummah Updates - get is added to prayerTimes route
//router.post("/add-userTime", addUserTimesAndUpdate);
//router.put("/edit-userTime/:id", updateIqamahTime);
//router.delete("/delete-userTime/:id", deleteIqamahTime);

router.get("/prayerTimes", getTodayPrayerTime);

export default router;
