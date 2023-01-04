import { Document } from "mongoose";

export interface Newsletter extends Document{
    pdfUrl: string,
    date: String
}
