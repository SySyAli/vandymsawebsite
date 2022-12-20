import express, { Express } from "express"
//import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"
import bodyparser from "body-parser"
const app: Express = express();

const PORT: string | number = process.env.PORT || 4000


console.log("Hello World")
app.use(express.json())
app.use(bodyparser)
app.use(cors())
app.use(routes)

console.log("Hello World2")

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)

/*
mongoose.connect('mongodb://localhost:27017/admin').then(() =>
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
)
.catch(error => {
throw error
})

*/

