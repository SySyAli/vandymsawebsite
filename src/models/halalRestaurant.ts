import {halalRestaurant} from "../types/halalRestaurant"
import {model, Schema} from "mongoose"


const HalalRestaurantSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    note: {
        type:String,
        required: false
    },
    website: {
        type:String,
        required: true
    },
    onMealMoney: {
        type: Boolean,
        required: true
    },
    imageUrl:{
        type:String,
        required:false
    }
},
{timestamps: true}
)

export default model<halalRestaurant>("HalalRestaurants", HalalRestaurantSchema)
