import { model, Schema } from "mongoose";

const googleapisSchema = new Schema(
	{
		photoLinks: {
			type: Array,
			required: true,
		},
        calendarEvents:{
            type: Array,
            required: true
        }
	},
	{ timestamps: true }
);
export default model("GoogleAPIs", googleapisSchema);
