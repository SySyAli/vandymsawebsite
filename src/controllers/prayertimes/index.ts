import {Response, Request} from "express"
import axois from "axios"

async function getTodayPrayerTime(req: Request, res: Response){
    try{
        // TO DO
        // Maybe store jummah and iqamah times in front end
        // Store query parameters in front end

        const date = new Date()
        // Annex Coordinates: (36.14479431053963, -86.80420024114342)
        const parameters = {
            "latitude": req.query.latitude,
            "longitude": req.query.longitude,
            "method": req.query.method,
            "month":date.getMonth()+1,
            "year": date.getFullYear()
        }
        var errorString: string = ""
        if(parameters.latitude === undefined){
            errorString += 'Latitude is undefined. '
        } else if (parameters.longitude === undefined){
            errorString += 'Longitude is undefined. '
        }else if (parameters.method === undefined){
            errorString += 'Method is undefined. '
        }
        if(parameters.latitude === undefined || parameters.longitude === undefined || parameters.method === undefined){
            console.log(errorString)
            throw errorString
        }

        const data = await axois.get(`http://api.aladhan.com/v1/calendar?latitude=${parameters.latitude}&longitude=${parameters.longitude}&method=${parameters.method}&month=${parameters.month}&year=${parameters.year}`)
        const currTime = await data.data.data[date.getDate()-1]

        // get current prayer using the timestamp
        const prayerTimes24hrs = {"fajr": removeCST(currTime.timings.Fajr) + ":00", 
                                "sunrise": removeCST(currTime.timings.Sunrise) + ":00",
                                "zuhr":removeCST(currTime.timings.Dhuhr) + ":00", 
                                "asr": removeCST(currTime.timings.Asr) + ":00", 
                                "maghrib": removeCST(currTime.timings.Maghrib) +":00", 
                                "isha": removeCST(currTime.timings.Isha) + ":00"}
        
        var currentTimeStamp:string
         if(date.getMinutes() < 10){
            currentTimeStamp = date.getHours() + ":0" + date.getMinutes()
        } else{
            currentTimeStamp = date.getHours() + ":" + date.getMinutes()
        }
        console.log(currentTimeStamp)

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
        "iqammahTimes": {"fajr": "NA", "sunrise": "NA","zuhr":"1:15PM", "asr": "3:05PM", "maghrib": addingMinutes(removeCST(currTime.timings.Maghrib) +":00", "00:05:00"), "isha":"7:00PM", "firstJummah": "12:15PM", "secondJummah": "1:15PM"}, 
        "prayerTimes":{"fajr": prayerTimes12hrs.fajr, "sunrise": prayerTimes12hrs.sunrise,"zuhr": prayerTimes12hrs.zuhr, "asr": prayerTimes12hrs.asr, "maghrib": prayerTimes12hrs.maghrib, "isha": prayerTimes12hrs.isha, "firstJummah": "12:20PM", "secondJummah": "1:20PM"},
        "IslamicDate": {"day": currTime.date.hijri.day, "month":changeMonthName(currTime.date.hijri.month.number), "year":currTime.date.hijri.year}, 
        "timezone":currTime.meta.timezone, 
        "currentTime": Date.now(),
        "currentTimeStamp": convertTo12HRTime(currentTimeStamp),
        "currentPrayer": findCurrentSalah(currentTimeStamp, prayerTimes24hrs)
    })
    } catch(err){
        console.log(err)
        throw err
    }
}


function removeCST(t1: string){
    var position: number = t1.indexOf(' ')
    if(position === -1){
        return t1;
    } else{
        return t1.substring(0, position)
    }

}

function convertTo12HRTime(time:string){
    var newTime = new Date('1970-01-01T' + time )

    var hours = newTime.getHours()
    
    const AMorPM = hours >= 12 ? 'PM' : 'AM'
   
    
    hours = (hours % 12) || 12

    if(newTime.getMinutes() < 10){
        return hours + ":0" + newTime.getMinutes() + "" + AMorPM
    } else{
        return hours + ":" + newTime.getMinutes() + "" + AMorPM
    }

    

}

function addingMinutes(time:string, minutes:string){

    var timeToAddArr = minutes.split(":");             
    var ms = (60 * 60 * parseInt(timeToAddArr[0]) + 60 * (parseInt(timeToAddArr[1])) ) * 1000;
  
    var newTime =new Date('1970-01-01T' + time).getTime() + ms
    
    var finalTime = new Date(newTime)

    if(finalTime.getMinutes() < 10){
        convertTo12HRTime(finalTime.getHours() + ":0" + finalTime.getMinutes() + ":00")
    } else{
        convertTo12HRTime(finalTime.getHours() + ":" + finalTime.getMinutes() + ":00")
    }

}

function findCurrentSalah(currentTime:string, prayerTimes:any){
    // make a bunch date objs until i find the first that it is bigger
    var newTime = new Date('1970-01-01T' + currentTime)
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

export default getTodayPrayerTime;


