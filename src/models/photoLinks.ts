import {model, Schema} from "mongoose"


const photoLinksSchema = new Schema({
    links:{
        type: Array,
        required: true
    }
},
{timestamps: true}
)
export default model("photoLinks", photoLinksSchema)