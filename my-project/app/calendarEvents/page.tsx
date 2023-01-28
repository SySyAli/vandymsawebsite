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

      <div className="flex items-center justify-center select-none p-8">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=NDUwYWFiNmQwOTdmMmM2ZDY2ZmY0Njk4ZDUxN2M5ODU2ODFhOWVkODk1YzIxMTQwZjAwNWE2YzgwODAwNzYwY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23009688&output=embed"
          className="w-full h-[50vh]"
        ></iframe>
      </div>
    </div>
  );
}
