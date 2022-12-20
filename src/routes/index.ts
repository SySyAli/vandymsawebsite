import express from "express"
import getPrayerTimes from "./../controllers/prayertimes"

const router = express.Router();

router.get("/prayerTimes", getPrayerTimes)

export default router