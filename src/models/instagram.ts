import {model, Schema} from "mongoose"
import {InstagramType} from "../types/instagram"

const InstagramSchema = new Schema({
    access_token:{
        type: String,
        required: true
    },
    token_type:{
        type: String,
        required: true
    },
    expires_in:{
        type: String,
        required: true
    }, posts:{
        type: Array,
        required: true
    }

},
{timestamps:true})

export default model<InstagramType>("Instagrams", InstagramSchema)