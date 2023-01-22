import {halalFoodType} from "../types/halalFood"
import {model, Schema} from "mongoose"


const halalFoodSchema = new Schema({
    everything:{
        type: Array,
        required: true
    }
},
{timestamps: true}
)
export default model<halalFoodType>("HalalFood", halalFoodSchema)