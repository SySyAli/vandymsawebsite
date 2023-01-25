import {Response, Request} from "express"
import axois from "axios"
import {PrayerTime} from "../../types/prayertimeupdate"
import PrayerTimes from "../../models/prayertimeupdate"
import { PrayerTimesAPI } from "../../types/prayertimeapi"
import prayertimesapi from "../../models/prayertimesapi"

// CRUD Operations for Iqamah, Jummah Times and Jummah Updates Search 


async function refershPrayerTimes(){
    try {
        const times: PrayerTime[] = await PrayerTimes.find()
        const date = new Date()
        // Annex Coordinates: (36.14479431053963, -86.80420024114342)
        const parameters = await {
            "latitude": times[0].latitude,
            "longitude": times[0].longitude,
            "method": times[0].method,
            "month":date.getMonth()+1,
            "year": date.getFullYear(),
            "maghribDelay": times[0].maghribDelay
        }
        //console.log(date.toString())
        const data = await axois.get(`http://api.aladhan.com/v1/calendar?latitude=${parameters.latitude}&longitude=${parameters.longitude}&method=${parameters.method}&month=${parameters.month}&year=${parameters.year}`)
        const currTime = await data.data.data[date.getDate()-1]

        const count = await prayertimesapi.count()
        if(count === 0){
            const toBeAdded: PrayerTimesAPI = new prayertimesapi({
                "everything": currTime
            })
            await toBeAdded.save()
            console.log("CREATED THING")
        } else{
            const oldTimes = await prayertimesapi.find()
            await prayertimesapi.findByIdAndUpdate({"_id": oldTimes[0]._id}, {"everything": currTime})
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}

async function getUserTimesAndUpdate(req: Request, res: Response){
    try{
        //const prayerTimes = await getTodayPrayerTime()
        const times: PrayerTime[] = await PrayerTimes.find()
        res.status(200).json(times)
    } catch (err){
        console.log(err)
        throw err
    }
}

async function addUserTimesAndUpdate(req: Request, res: Response){
    try{
        const body = req.body as Pick<PrayerTime, "fajrIqamah" | "sunriseIqamah" | "zuhrIqamah" | "asrIqamah" | "maghribIqamah"
        | "ishaIqamah" | "firstJummahIqamah" | "secondJummahIqamah" | "firstJummahTime" | "secondJummahTime" | "maghribDelay" |"jummahUpdate" | "latitude" | "longitude" | "method">

        const prayertoBeAdded: PrayerTime = new PrayerTimes({
            fajrIqamah: body.fajrIqamah,
            sunriseIqamah: body.sunriseIqamah,
            zuhrIqamah: body.zuhrIqamah,
            asrIqamah: body.asrIqamah,
            maghribIqamah: body.maghribIqamah,
            ishaIqamah: body.ishaIqamah,
            firstJummahIqamah: body.firstJummahIqamah,
            secondJummahIqamah: body.secondJummahIqamah,
            firstJummahTime: body.firstJummahTime,
            secondJummahTime: body.secondJummahTime,
            maghribDelay: body.maghribDelay,
            jummahUpdate: body.jummahUpdate,
            latitude: body.latitude,
            longitude: body.longitude,
            method: body.method
        })

        const newPrayerTime: PrayerTime = await prayertoBeAdded.save()
        const allPrayerTime: PrayerTime[] = await PrayerTimes.find()

        res.status(200).json({"message": "data stored succesfully", "addedTime": newPrayerTime, "allPrayerTimes": allPrayerTime})
        
    } catch (err){
        console.log(err)
        throw err
    }
}

async function updateIqamahTime(req: Request, res: Response){
    try{
        // the update will change based on what i WANT to do with it
        const body = {id: req.params.id, body: req.body}
        const updated: PrayerTime | null = await PrayerTimes.findByIdAndUpdate({_id: body.id}, {$set: body.body})
        const allTimes: PrayerTime[] = await PrayerTimes.find()
        res.status(200).json({
            "message": "userChangesUpdated",
            "updatedTimes": updated,
            "allTimes" : allTimes
        })

    } catch (err){
        console.log(err)
        throw err
    }
}

async function deleteIqamahTime(req: Request, res: Response){
    try{
    const body = {id: req.params.id, body: req.body}
    const deletedTime: PrayerTime | null = await PrayerTimes.findByIdAndDelete(body.id, body.body)
    const allTimes: PrayerTime[] = await PrayerTimes.find()
    res.status(200).json({
        "message": "userChangesDeleted",
        "deletedtime": deletedTime,
        "allTimes" : allTimes
    })
    } catch (err){
        console.log(err)
        throw err
    }
}

async function getTodayPrayerTime(req: Request, res: Response){
    try{
        // TO DO
        // Maybe store jummah and iqamah times in front end
        // Store query parameters in front end
        const times: PrayerTime[] = await PrayerTimes.find()
        const date = new Date()
        // Annex Coordinates: (36.14479431053963, -86.80420024114342)
        const parameters = await {
            "latitude": times[0].latitude,
            "longitude": times[0].longitude,
            "method": times[0].method,
            "month":date.getMonth()+1,
            "year": date.getFullYear(),
            "maghribDelay": times[0].maghribDelay
        }
        //console.log(date.toString())
        

        let currTime: any = await prayertimesapi.find()
        currTime = currTime[0].everything
        // get current prayer using the timestamp
        const prayerTimes24hrs = {"fajr": removeCST(currTime.timings.Fajr) + ":00", 
                                "sunrise": removeCST(currTime.timings.Sunrise) + ":00",
                                "zuhr":removeCST(currTime.timings.Dhuhr) + ":00", 
                                "asr": removeCST(currTime.timings.Asr) + ":00", 
                                "maghrib": removeCST(currTime.timings.Maghrib) +":00", 
                                "isha": removeCST(currTime.timings.Isha) + ":00"}
        
        let currentTimeStamp:string
        if(date.getHours() < 10){
            currentTimeStamp = "0" + date.getHours()
        } else{
            currentTimeStamp = "" + date.getHours()
        }
         if(date.getMinutes() < 10){
            currentTimeStamp += ":0" + date.getMinutes()
        } else{
            currentTimeStamp += ":" + date.getMinutes()
        }
        //console.log(date.getHours())
        // East Coast time
        
        //console.log(convertTo12HRTime(currentTimeStamp) + ", "+ findCurrentSalah(currentTimeStamp, prayerTimes24hrs))
        //console.log(convertTo12HRTime(currentTimeStamp) + ", "+ findCurrentSalah(currentTimeStamp, prayerTimes24hrs))
        /*
        console.log(convertTo12HRTime("04:00:00") + ", "+ findCurrentSalah("04:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("06:00:00") + ", "+ findCurrentSalah("06:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("07:00:00") + ", "+ findCurrentSalah("07:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("12:00:00") + ", "+ findCurrentSalah("12:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("11:45:00") + ", "+ findCurrentSalah("11:45:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("15:00:00") + ", "+ findCurrentSalah("15:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("16:00:00") + ", "+ findCurrentSalah("16:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("17:00:00") + ", "+ findCurrentSalah("17:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("19:00:00") + ", "+ findCurrentSalah("19:00:00", prayerTimes24hrs))
        console.log(convertTo12HRTime("21:00:00") + ", "+ findCurrentSalah("21:00:00", prayerTimes24hrs))
        */

        const prayerTimes12hrs = {"fajr": convertTo12HRTime(prayerTimes24hrs.fajr), 
                                "sunrise": convertTo12HRTime(prayerTimes24hrs.sunrise),
                                "zuhr":convertTo12HRTime(prayerTimes24hrs.zuhr), 
                                "asr": convertTo12HRTime(prayerTimes24hrs.asr), 
                                "maghrib": convertTo12HRTime(prayerTimes24hrs.maghrib), 
                                "isha": convertTo12HRTime(prayerTimes24hrs.isha)}
       
        res.status(201).json({
        "maghribiqammah": addingMinutes(removeCST(prayerTimes24hrs.maghrib) +":00", Number(parameters.maghribDelay)), 
        "prayerTimes":{"fajr": prayerTimes12hrs.fajr, "sunrise": prayerTimes12hrs.sunrise,"zuhr": prayerTimes12hrs.zuhr, "asr": prayerTimes12hrs.asr, "maghrib": prayerTimes12hrs.maghrib, "isha": prayerTimes12hrs.isha},
        "IslamicDate": {"day": currTime.date.hijri.day, "month":changeMonthName(currTime.date.hijri.month.number), "year":currTime.date.hijri.year}, 
        "timezone":currTime.meta.timezone, 
        "currentTimeStamp": convertTo12HRTime(currentTimeStamp) + ", "+ (date.getMonth()+1)+ "/" + date.getDate()+"/" + date.getFullYear(),
        "currentPrayer": findCurrentSalah(currentTimeStamp, prayerTimes24hrs),
        "currentDay": date.getDay(),
        "iqammahTimes": await times[0]
    })
    } catch(err){
        console.log(err)
        throw err
    }
}


function removeCST(t1: string){
    const position: number = t1.indexOf(' ')
    if(position === -1){
        return t1;
    } else{
        return t1.substring(0, position)
    }

}

function convertTo12HRTime(time:string){
    const newTime = new Date('1970-01-01T' + time )

    let hours = newTime.getHours()
    
    const AMorPM = hours >= 12 ? 'PM' : 'AM'
   
    if(hours % 12 == 0){
        hours = 12
    }  else{
        hours = hours % 12
    }

    let returnString:string

    if(newTime.getHours() < 10){
        returnString =  "0" + hours
    } else{
        returnString =  "" + hours 
    }

    if(newTime.getMinutes() < 10){
        return returnString + ":0" + newTime.getMinutes() + "" + AMorPM
    } else{
        return returnString + ":" + newTime.getMinutes() + "" + AMorPM
    }

    

}

// FINICKY METHOD
function addingMinutes(time:string, minutes:number){

    const newTime =new Date('1970-01-01 ' + time)
    newTime.setMinutes(newTime.getMinutes() + minutes)


    let hours = newTime.getHours()
    
    const AMorPM = hours >= 12 ? 'PM' : 'AM'
    
    if(hours % 12 == 0){
        hours = 12
    }  else{
        hours = hours % 12
    }

    if(newTime.getMinutes() < 10){
        return hours + ":0" + newTime.getMinutes() + "" + AMorPM
    } else{
        return hours + ":" + newTime.getMinutes() + "" + AMorPM
    }


}

function findCurrentSalah(currentTime:string, prayerTimes:any){
    //console.log(currentTime)
    //console.log(prayerTimes)
    // make a bunch date objs until i find the first that it is bigger
    const newTime = new Date('1970-01-01T' + currentTime)
    if(newTime < new Date('1970-01-01T' + prayerTimes.fajr) || newTime > new Date('1970-01-01T' + prayerTimes.isha)){
        return "isha"
    } else if(newTime < new Date('1970-01-01T' + prayerTimes.sunrise)){
        return "fajr"
    } else if(newTime < new Date('1970-01-01T' + prayerTimes.zuhr)){
        return "NoPrayerTime"
    } else if(newTime < new Date('1970-01-01T' + prayerTimes.asr)){
        return "zuhur"
    } else if(newTime < new Date('1970-01-01T' + prayerTimes.maghrib)){
        return "asr"
    } else if(newTime < new Date('1970-01-01T' + prayerTimes.isha)){
        return "magrhib"
    } else{
        return "isha"
    } 

}

function changeMonthName(monthNum:number){
    const islamicMonth = ["Muharram", "Safar", "Rabi al-Awwal","Rabi al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Shaban","Ramadan","Shawwal","Dhu al-Qadah","Dhu al-Hijjah"]
    return islamicMonth[monthNum-1]

}

export {refershPrayerTimes, getUserTimesAndUpdate, addUserTimesAndUpdate, updateIqamahTime, deleteIqamahTime, getTodayPrayerTime};


