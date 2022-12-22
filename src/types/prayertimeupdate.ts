import { Document } from "mongoose";

export interface PrayerTime extends Document{
    fajrIqamah: string,
    sunriseIqamah: string,
    zuhrIqamah: string,
    asrIqamah: string,
    maghribIqamah: string,
    ishaIqamah: string,
    firstJummahIqamah: string,
    secondJummahIqamah: string,
    firstJummahTime: string,
    secondJummahTime: string,
    maghribDelay: string,
    jummahUpdate: string
}
