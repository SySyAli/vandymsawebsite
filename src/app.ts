/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
import express, { Express } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require("mongoose");
import cors from "cors";
import routes from "./routes";
import cron from "node-cron";
import { refreshPosts, refreshToken } from "./controllers/instagram";
import { refreshFood } from "./controllers/vandyHalalFood";
import {
	refershPrayerTimes,
	refreshIqamahTimes,
} from "./controllers/prayertimesjummahupdate";
//import { refreshCalendarEventsPhotos } from "./controllers/calendar";
import CONFIG from "./CONFIG.json";
import { refreshPhotos } from "./controllers/pictures";

const app: Express = express();
const uri = CONFIG.MONGODB_URI || "mongodb://localhost:27017/admin";

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT: string | number = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(routes);

/*
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
*/

// cron call - runs at 3 AM everyday
cron.schedule("0 0 3 * * *", async () => {
	await refreshToken();
	await refreshFood();
	await refershPrayerTimes();
});

cron.schedule("0 0 5 * * *", async () => {
	await refershPrayerTimes();
});

// cron call - runs at 12 AM everyday
cron.schedule("0 0 0 * * *", async () => {
	await refershPrayerTimes();
});

// cron call - runs every 10 minutes
cron.schedule("*/5 * * * *", async () => {
	await refreshIqamahTimes();
	//await refreshCalendarEventsPhotos();
	console.log(
		"CRONJOB: Refreshed Posts and Calendar Events Photos, Iqamah Times"
	);
});

// cron - call every hour
cron.schedule("0 * * * *", async () => {
	await refreshPhotos();
	await refreshPosts();
	console.log("CRONJOB: Refreshed Cloudinary Image URLS");
});

mongoose.set("strictQuery", true);
// should be uri
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, no-constant-condition

if (uri) {
	//
	mongoose
		.connect(uri)
		.then(async () => {
			//await refreshCalendarEventsPhotos();
			await refreshPhotos();
			await refreshIqamahTimes();
			await refershPrayerTimes();
			await refreshFood();
			await refreshToken();
			await refreshPosts();
		})
		.then(() =>
			app.listen(PORT, async () =>
				console.log(`Server running on http://localhost:${PORT}`)
			)
		)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.catch((error: any) => {
			throw error;
		});
} else {
	console.log("No URI");
	throw new Error("No URI - SERVER FAILED");
}
