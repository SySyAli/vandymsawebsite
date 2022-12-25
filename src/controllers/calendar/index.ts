/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {Request, Response} from "express"
import {google} from "googleapis"


const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY=process.env.GOOGLE_PRIVATE_KEY
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    undefined,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);

const calendar = google.calendar({
    version: 'v3',
    auth: jwtClient
});


// get events and them in a json form using google calendar api
async function getCalendarEvents(req: Request, res: Response){
    try {
        calendar.events.list({
            calendarId: GOOGLE_CALENDAR_ID,
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
          }, (error, result) => {
            if (error) {
              res.send(JSON.stringify({ error: error }));
            } else {
              if (result != null && result.data.items != null && result.data.items.length != null && result.data.items.length) {
                res.send(JSON.stringify({ message: 'Events sent successfully!', events: result.data.items }))
              } else {
                res.send(JSON.stringify({ message: 'No upcoming events found.' }))
              }
            }
          });

    } catch (error) {
        console.log(error)
        throw error
    }
}


export {getCalendarEvents}

