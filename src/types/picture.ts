import { Document } from "mongoose";

export interface Picture extends Document{
    imageUrl: string,
    date: String,
    eventName: string   
}
