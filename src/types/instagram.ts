import { Document } from "mongoose"

export interface InstagramType extends Document{
    access_token: String,
    token_type: String,
    expires_in: Number
}


