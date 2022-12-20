import {Response, Request} from "express"
import axois from "axios"

async function getTodayPrayerTime(req: Request, res: Response){
    try{
        // TO DO
        // figure out adding time
        // figure out updating location and iqamah times, parameterized link and store state front end
        /* FRONT END
        axios
        .get('http://localhost:4000/prayerTimes', {
          params: {
            "latitude": feedBACK,
            "longitude": feedBACK,
            "method": feedBACK,
            "month": feedBACK,
            "year": feedBACK
        }
        })
        */
        // update parameters to take from req
        const date = new Date()
        const parameters = {
            "latitude": 36.14479431053963,
            "longitude":-86.80420024114342,
            "method": 2,
            "month":date.getMonth()+1,
            "year": date.getFullYear()
        }
        const data = await axois.get(`http://api.aladhan.com/v1/calendar?latitude=${parameters.latitude}&longitude=${parameters.longitude}&method=${parameters.method}&month=${parameters.month}&year=${parameters.year}`)
        const currTime = await data.data.data[date.getDate()-1]
        res.status(201).json({"iqammahTimes": {"fajr": "NA", "zuhr":"1:15PM", "asr": "3:05PM", "maghrib": `${currTime.timings.Maghrib + 5}PM`, "isha":"7:00PM", "firstJummah": "12:15PM", "secondJummah": "1:15PM"}, 
        "prayerTimes":{"fajr": "N/A", "zuhr":currTime.timings.Dhuhr, "asr": currTime.timings.Asr, "maghrib": currTime.timings.Maghrib, "isha":currTime.timings.Isha, "firstJummah": "12:20PM", "secondJummah": "1:20PM"},
        "IslamicDate": {"day": currTime.date.hijri.day, "month":currTime.date.hijri.month.en, "year":currTime.date.hijri.year}, 
        "timezone":currTime.meta.timezone, 
        "currentTime":currTime.date.timestamp})
    } catch(err){
        console.log(err)
        throw err
    }
}

export default getTodayPrayerTime;


