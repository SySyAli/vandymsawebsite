import * as dotenv from 'dotenv' 
dotenv.config()
import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"
import cron from "node-cron"
import { refreshToken } from './controllers/instagram'

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


// cron call - runs at 12 AM everyday
cron.schedule('0 0 23 * * *', async () => {
    await refreshToken();
});

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/admin').then(async () =>{
  await refreshToken()
}).then(() =>
app.listen(PORT, async () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
)
.catch(error => {
throw error
})

