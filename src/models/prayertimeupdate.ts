import {PrayerTime} from "../types/prayertimeupdate"
import {model, Schema} from "mongoose"

const prayerTimeSchema = new Schema({
    fajrIqamah:{
        type:String,
        required: true
    },
    sunriseIqamah:{
        type:String,
        required: true
    },
    zuhrIqamah:{
        type:String,
        required: true
    },
    asrIqamah:{
        type:String,
        required: true
    },
    maghribIqamah:{
        type:String,
        required: true
    },
    ishaIqamah:{
        type:String,
        required: true
    },
    firstJummahIqamah:{
        type:String,
        required: true
    },
    secondJummahIqamah:{
        type:String,
        required: true
    },
    firstJummahTime:{
        type:String,
        required: true
    },
    secondJummahTime:{
        type:String,
        required: true
    },
    maghribDelay:{
        type:String,
        required: true
    },
    jummahUpdate:{
        type:String,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    }, 
    method:{
        type: Number,
        required: true
    }
},
{timestamps: true}
);

export default model<PrayerTime>("PrayerTimes", prayerTimeSchema)