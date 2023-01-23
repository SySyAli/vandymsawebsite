import {google} from 'googleapis'
import {Request, Response} from "express"
import { link } from 'fs'

const GOOGLE_PRIVATE_KEY=process.env.GOOGLE_DRIVE_API_KEY
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_DRIVE_CLIENT_EMAIL
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID


const scopes = [
    'https://www.googleapis.com/auth/drive'
  ]

  const auth = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL, 
    undefined,
    GOOGLE_PRIVATE_KEY, 
    scopes
  )

  const drive = google.drive({ version: "v3", auth })

async function getGooglePhotoLinks(req: Request, res: Response){
    try {
        const linksArray: any = []
        // get ids, then put it into links
        const results = await drive.files.list({q:"'1Ex2KzmkkUb8T2tkvG72pk-FNHdlEjrmC' in parents"})
        console.log(results.data.files)
        if(results.data.files !== undefined){
            for(let i = 0; i < results.data.files.length; i++){
                linksArray[i] = `https://drive.google.com/uc?export=view&id=${results.data.files[i].id}`
            }
            res.status(200).json({"message": "NO PHOTO LINKS", "results": linksArray})
        } else{
            res.status(200).json({"message": "NO PHOTO LINKS", "results": linksArray})
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}
export {getGooglePhotoLinks}