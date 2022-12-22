import express from "express"
import getPrayerTimes from "./../controllers/prayertimesjummahupdate"

const router = express.Router();

router.get("/prayerTimes", getPrayerTimes)

export default router