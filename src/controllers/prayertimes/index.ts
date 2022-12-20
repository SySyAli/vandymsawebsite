import {Response, Request} from "express"

async function getTodayPrayerTime(req: Request, res: Response){
    try{
        const date = new Date()
        const data = await fetch(`http://api.aladhan.com/v1/calendar?latitude=36.14479431053963&longitude=-86.80420024114342&method=2&month=${date.getMonth()+1}&year=${date.getFullYear()}`)
        console.log(data)
        res.status(201).json({"prayerTimes": data})
    } catch(err){
        console.log(err)
        throw err
    }
}

export default getTodayPrayerTime;


