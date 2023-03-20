/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Request, Response } from "express";
import { google } from "googleapis";
import googleapis from "../../models/googleapis";

import {GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL, GOOGLE_CALENDAR_ID} from "../../config.json";


const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";


const jwtClient = new google.auth.JWT(
	GOOGLE_CLIENT_EMAIL,
	undefined,
	GOOGLE_PRIVATE_KEY,
	SCOPES
);

const calendar = google.calendar({
	version: "v3",
	auth: jwtClient,
});


async function getSingleEvent(req: Request, res: Response) {
	try {
		calendar.events.get(
			{
				calendarId: GOOGLE_CALENDAR_ID,
				eventId: req.params.id,
			},
			(error, result) => {
				if (error) {
					res.send(JSON.stringify({ error: error }));
				} else {
					if (result != undefined) {
						res
							.status(200)
							.json({
								message: "Event found successfully.",
								event: result.data,
							});
					} else {
						res.status(200).json({ message: "API undefined", event: result });
					}
				}
			}
		);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function refreshCalendarEventsPhotos() {
	try {
		// GET EVENTS
		const allEvents = await calendar.events.list(
			{
				calendarId: GOOGLE_CALENDAR_ID,
				timeMin: new Date().toISOString(),
				maxResults: 10,
				singleEvents: true,
				orderBy: "startTime",
			});

		const googleAPISDB = await googleapis.find();
		//let photoLinks = await getAllPhotoLinks();
		let photoLinks = []
		photoLinks = photoLinks.slice(0, 10);
		if (googleAPISDB.length === 0) {
			const newGoogleAPISDB = new googleapis({
				calendarEvents: allEvents,
				photoLinks: photoLinks,
			});
			await newGoogleAPISDB.save();
			const googleAPISDB = await googleapis.find();
			console.log(googleAPISDB);
			console.log("CREATED THING");
		} else {
			const oldCal = await googleapis.find();
			await googleapis.findByIdAndUpdate(
				{ _id: oldCal[0]._id },
				{ calendarEvents: allEvents.data.items, photoLinks: photoLinks }
			);
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

// get events and them in a json form using google calendar api
async function getCalendarEvents(req: Request, res: Response) {
	try {
		const googleAPISDB = await googleapis.find();
		res.status(200).json({ events: googleAPISDB[0].calendarEvents });
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export { getCalendarEvents, getSingleEvent, refreshCalendarEventsPhotos };
