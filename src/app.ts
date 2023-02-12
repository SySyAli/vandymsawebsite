import * as dotenv from 'dotenv' 
dotenv.config()
import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"
import cron from "node-cron"
import { refreshPosts, refreshToken } from './controllers/instagram'
import { refreshFood } from './controllers/vandyHalalFood'
import {refershPrayerTimes} from  './controllers/prayertimesjummahupdate'
import { refreshCalendarEventsPhotos } from './controllers/calendar'

const app: Express = express();

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT: string | number = process.env.PORT || 4000


app.use(express.json())
app.use(cors())
app.use(routes)

/*
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
*/


// cron call - runs at 3 AM everyday
cron.schedule('0 0 3 * * *', async () => {
    await refreshToken();
    await refreshFood()
    await refershPrayerTimes()
});

// cron call - runs at 12 AM everyday
cron.schedule('0 0 0 * * *', async () => {
  await refershPrayerTimes()
});

// cron call - runs every 10 minutes
cron.schedule('*/5 * * * *', async () => {
  await refreshPosts()
  await refreshCalendarEventsPhotos()
  console.log("CRONJOB: Refreshed Posts and Calendar Events Photos")
});


mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/admin').then(async () =>{
  await refreshCalendarEventsPhotos()
  await refreshToken()
  await refreshPosts()
  await refershPrayerTimes()
  await refreshFood()
}).then(() =>
app.listen(PORT, async () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
)
.catch(error => {
throw error
})

