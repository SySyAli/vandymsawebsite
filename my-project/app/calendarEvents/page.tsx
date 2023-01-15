import Carousel from "./Carousel";

async function getEvents() {
  const url = "http://localhost:4000";
  const res = await fetch(url + `/getMSAEvents`, { cache: "no-store" });
  const data = res.json();
  return data
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex gap-y-10 flex-col">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Events</h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">{events.message}</p>
            
      {events.events.length === 0 ? <h2>No Events to be Displayed</h2>: <Carousel events={events.events}/>}

      <div className="flex items-center justify-center select-none ">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=NDUwYWFiNmQwOTdmMmM2ZDY2ZmY0Njk4ZDUxN2M5ODU2ODFhOWVkODk1YzIxMTQwZjAwNWE2YzgwODAwNzYwY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688&output=embed"
          width={1000}
          height={500}
        ></iframe>
      </div>
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
// max-h-fit
function Event({ event }: any) {
  return (
    <div>
      <div className="card card-bordered bg-base-200 shadow-xl h-fit w-fit">
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
    </div>
  );
}
