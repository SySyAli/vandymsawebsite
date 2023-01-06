import Link from "next/link";

async function getEvent(id: string){
    const url = "http://localhost:4000";
    const res = await fetch(url + `/getSingleEvent/` + id,{cache: 'no-store'});
    const data = res.json();
    return data;
}


export default async function EventsPage({params}: any){
    const event = await getEvent(params.id)
    return(
        <>
        <Link href={`/calendarEvents`}>
            <div>
                {event.event.summary === undefined ? <h2>(No Name)</h2>: <h2>{event.event.summary}</h2>}
                {event.event.location === undefined ? <h4>Undefined/Online</h4>: <h4>{event.event.location}</h4>}               
                {event.event.start.timeZone === undefined ? <h6>(No Timezone)</h6>: <h6>Timezone: {event.event.start.timeZone}</h6>}
                {event.event.start.dateTime === undefined ?  <p></p>: <p>Start Time: {event.event.start.dateTime}</p>}
                {event.event.end.dateTime === undefined ? <p></p>: <p>End Time: {event.event.end.dateTime}</p>}
                {event.event.start.date === undefined ?  <p></p>: <p>Start Date: {event.event.start.date}</p>}
                {event.event.end.date === undefined ? <p></p>: <p>End Date: {event.event.end.date}</p>}
                {event.event.description === undefined ? <p>Undefined</p>: <p>{event.event.description}</p>}
            </div>
        </Link>
        </>
    )
}