import Carousel from "./Carousel";

async function getEvents() {
  const url = "http://localhost:4000";
  const res = await fetch(url + `/getMSAEvents`, { cache: "no-store" });
  const data = res.json();
  return data;
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="pl-6 mb-4 text-4xl font-extrabold leading-none tracking-tight ">
        Events
      </h1>
      {/*       <div className="w-full p-1">
        {events.events.length === 0 ? (
          <h2>No Events to be Displayed</h2>
        ) : (
          <Carousel events={events.events} />
        )}
      </div> */}

      <div className="flex items-center justify-center select-none p-8">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=NDUwYWFiNmQwOTdmMmM2ZDY2ZmY0Njk4ZDUxN2M5ODU2ODFhOWVkODk1YzIxMTQwZjAwNWE2YzgwODAwNzYwY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688&output=embed"
          className="w-full h-[50vh]"
        ></iframe>
      </div>
    </div>
  );
}
