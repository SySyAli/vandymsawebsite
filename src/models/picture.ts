import {Picture} from "../types/picture"
import {model, Schema} from "mongoose"

const pictureSchema = new Schema({
    imageUrl:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    eventName:{
        type:String,
        required: false
    }
},
{timestamps: true})

export default model<Picture>("Pictures", pictureSchema)