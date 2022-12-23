import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"


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

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/admin').then(() =>
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
)
.catch(error => {
throw error
})



