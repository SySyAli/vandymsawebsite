import {PrayerTimesAPI} from '../types/prayertimeapi'
import {model, Schema} from "mongoose"


const prayertimesapischema = new Schema({
    everything:{
        type: Object,
        required: true
    }
},
{timestamps: true}
)
export default model<PrayerTimesAPI>("PrayerTimesAPI", prayertimesapischema)