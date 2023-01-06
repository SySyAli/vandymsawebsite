import Link from "next/link";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";

async function getEvents() {
  const url = "http://localhost:4000";
  const res = await fetch(url + `/getMSAEvents`, { cache: "no-store" });
  const data = res.json();
  return data;
}

export default async function EventsPage() {
  const events = await getEvents();
  /*
  const calendarEl = document.getElementById("calendar");
  if (calendarEl != null) {
    console.log("Hello World");
    const calendar = new Calendar(calendarEl, {
      plugins: [googleCalendarPlugin, dayGridPlugin],
      initialView: "dayGridMonth",
      events: {
        googleCalendarId: process.env.GOOGLE_CALENDAR_ID,
      },
    });
    calendar.render();
  }
  */
 // EMBED GOOGLE CALENDAR
  return (
    <div>
      <h1>Events</h1>
      <p>{events.message}</p>
      {events.events.map((event: any) => {
        return <Event key={event.id} event={event} />;
      })}
      <div id="calendar">
        <iframe src="https://calendar.google.com/calendar/embed?src=450aab6d097f2c6d66ff4698d517c985681a9ed895c21140f005a6c80800760c%40group.calendar.google.com&ctz=America%2FNew_York" 
         width="800" height="600" ></iframe>

      </div>
    </div>
  );
}

function Event({ event }: any) {
  // need the following properties
  /*
			"id": "", DONE
			"summary": "", DONE
			"description": "", DONE
			"location": "", DONE
			"start": {
				"dateTime": "",
				"timeZone": ""
			},
			"end": {
				"dateTime": "",
				"timeZone": ""
			}
    */
  return (
    <Link href={`/calendarEvents/${event.id}`}>
      <div>
        {event.summary !== undefined ? (
          <h2>{event.summary}</h2>
        ) : (
          <h2>(No Name)</h2>
        )}
        {event.location !== undefined ? (
          <h4>{event.location}</h4>
        ) : (
          <h4>Undefined/Online</h4>
        )}
        {event.start.timeZone !== undefined ? (
          <h6>Timezone: {event.start.timeZone}</h6>
        ) : (
          <h6>(No Timezone)</h6>
        )}
        {event.start.dateTime !== undefined ? (
          <p>Start Time: {event.start.dateTime}</p>
        ) : (
          <p></p>
        )}
        {event.end.dateTime !== undefined ? (
          <p>End Time: {event.end.dateTime}</p>
        ) : (
          <p></p>
        )}
        {event.start.date !== undefined ? (
          <p>Start Date: {event.start.date}</p>
        ) : (
          <p></p>
        )}
        {event.end.date !== undefined ? (
          <p>End Date: {event.end.date}</p>
        ) : (
          <p></p>
        )}
        {event.description !== undefined ? (
          <p>{event.description}</p>
        ) : (
          <p>Undefined</p>
        )}
      </div>
    </Link>
  );
}
