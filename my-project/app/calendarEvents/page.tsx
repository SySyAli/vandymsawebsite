import Link from "next/link";

async function getEvents() {
  const url = "http://localhost:4000";
  const res = await fetch(url + `/getMSAEvents`, { credentials: 'omit',cache: "no-store" });
  const data = res.json();
  return data;
}

export default async function EventsPage() {
  const events = await getEvents();

  // EMBED GOOGLE CALENDAR
  return (
    <div>
      <h1>Events</h1>
      <p>{events.message}</p>
      <div className="carousel carousel-center rounded-box gap-x-10">
        {events.events.map((event: any) => {
          return <div className="carousel-item" key={event.id}><Event event={event} /></div>;
        })}
      </div>
      <iframe
        className="calendar"
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=NDUwYWFiNmQwOTdmMmM2ZDY2ZmY0Njk4ZDUxN2M5ODU2ODFhOWVkODk1YzIxMTQwZjAwNWE2YzgwODAwNzYwY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688&output=embed"
        width={1000}
        height={500}
      ></iframe>
    </div>
  );
}

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

function Event({ event }: any) {
  return (
    <div>
      <Link href={`/calendarEvents/${event.id}`}>
        <div className="card w-96 bg-base-100 shadow-xl flex-center">
          <div className="card-body">
              {event.summary !== undefined ? (
                <h2 className="card-title">{event.summary}</h2>
              ) : (
                <h2 className="card-title">(No Name)</h2>
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
        </div>
        <div></div>
      </Link>
    </div>
  );
}
