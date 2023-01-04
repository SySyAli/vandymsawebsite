import {Newsletter} from "../types/newsletter"
import {model, Schema} from "mongoose"

const newsletterSchema = new Schema({
    pdfUrl:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
},
{timestamps:true}
)
export default model<Newsletter>("Newsletters",newsletterSchema)