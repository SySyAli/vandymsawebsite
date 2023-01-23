import "./globals.css";
import Carousel from "./components/Carousel";

async function getPrayerTimes() {
  const url = await `http://localhost:4000/prayerTimes`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}
async function getPhotoUrls(){
  const url = await 'http://localhost:4000/getPhotoLinks'
  const res = await fetch(url, {cache: "no-store"})
  const data = await res.json()
  return data
}
async function getEvents(){
  const url = await 'http://localhost:4000/getMSAEvents'
  const res = await fetch(url, {cache: "no-store"})
  const data = await res.json()
  return data
}

// FIGURE OUT WHAT TO DO WITH CAROUSEL - AUTOMATIC OR BUTTONS/MANUAL
// FIGURE OUT TIME CONVERSION
export default async function Home() {
  const times: any = await getPrayerTimes()
  const photoUrls: any = await getPhotoUrls()
  const calendarEvents: any = await getEvents()
  const threeEvents: any = calendarEvents.events.slice(0,3)


  // maybe choose ten random elements?
  // get photo thing to work first
  return (
    <div>
      <div className="alert shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{times.iqammahTimes.jummahUpdate === 'undefined' ? <>Loading...</> : <>{times.iqammahTimes.jummahUpdate}</>}</span>
        </div>
      </div>
      
      <Carousel links={photoUrls.results}/>
      <PrayerTable iTimes={times}/>
      <h1>The Next Three Upcoming Event: </h1>
      {threeEvents.map((event: any, i: any) =>{
        return(
          <div key={i}><Event event={event}/></div>
        )
      })}
    </div>
  );
}

// FIGURE OUT TIMEZONES
// current Prayer
function PrayerTable({iTimes}: any){
  return (
    <>
    <h1 className="text-center font-bold">Prayer Times</h1>
    <h6 className="text-center">{iTimes.IslamicDate.day} {iTimes.IslamicDate.month}, {iTimes.IslamicDate.year} -- {iTimes.currentTimeStamp} -- Nashville, TN</h6>
    <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Title</th>
        <th>Fajr</th>
        <th>Sunrise</th>
        <th>Zuhr</th>
        <th>Asr</th>
        <th>Maghrib</th>
        <th>Isha</th>
        <th>First Jummah</th>
        <th>Second Jummah</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Prayer Time:</td>
        <td className={iTimes.currentPrayer === "fajr" ? "font-bold" : ""}>{iTimes.prayerTimes.fajr === 'undefined' ? 'Loading' : iTimes.prayerTimes.fajr}</td>
        <td className={iTimes.currentPrayer === "NoPrayerTime" ? "font-bold" : ""}>{iTimes.prayerTimes.sunrise === 'undefined' ? 'Loading' : iTimes.prayerTimes.sunrise}</td>
        <td className={iTimes.currentPrayer === "zuhur" ? "font-bold" : ""}>{iTimes.prayerTimes.zuhr === 'undefined' ? 'Loading' : iTimes.prayerTimes.zuhr}</td>
        <td className={iTimes.currentPrayer === "asr" ? "font-bold" : ""}>{iTimes.prayerTimes.asr === 'undefined' ? 'Loading' : iTimes.prayerTimes.asr}</td>
        <td className={iTimes.currentPrayer === "magrhib" ? "font-bold" : ""}>{iTimes.prayerTimes.maghrib === 'undefined' ? 'Loading' : iTimes.prayerTimes.maghrib}</td>
        <td className={iTimes.currentPrayer === "isha" ? "font-bold" : ""}>{iTimes.prayerTimes.isha === 'undefined' ? 'Loading' : iTimes.prayerTimes.isha}</td>
        <td>{iTimes.iqammahTimes.firstJummahTime === 'undefined' ? 'Loading' : iTimes.iqammahTimes.firstJummahTime}</td>
        <td>{iTimes.iqammahTimes.secondJummahTime === 'undefined' ? 'Loading' : iTimes.iqammahTimes.secondJummahTime}</td>
      </tr>
      <tr >
        <td>Iqamah Time: </td>
        <td className={iTimes.currentPrayer === "fajr" ? "font-bold" : ""}>{iTimes.iqammahTimes.fajrIqamah === 'undefined' ? 'Loading' : iTimes.iqammahTimes.fajrIqamah}</td>
        <td className={iTimes.currentPrayer === "NoPrayerTime" ? "font-bold" : ""}>{iTimes.iqammahTimes.sunriseIqamah === 'undefined' ? 'Loading' : iTimes.iqammahTimes.sunriseIqamah}</td>
        <td className={iTimes.currentPrayer === "zuhur" ? "font-bold" : ""}>{iTimes.iqammahTimes.zuhrIqamah === 'undefined' ? 'Loading' : iTimes.iqammahTimes.zuhrIqamah}</td>
        <td className={iTimes.currentPrayer === "asr" ? "font-bold" : ""}>{iTimes.iqammahTimes.asrIqamah === 'undefined' ? 'Loading' : iTimes.iqammahTimes.asrIqamah}</td>
        <td className={iTimes.currentPrayer === "magrhib" ? "font-bold" : ""}>{iTimes.maghribIqamah === 'undefined' ? 'Loading' : <>{iTimes.maghribiqammah}</>}</td>
        <td className={iTimes.currentPrayer === "isha" ? "font-bold" : ""}>{iTimes.iqammahTimes.ishaIqamah === 'undefined' ? 'Loading' : iTimes.iqammahTimes.ishaIqamah}</td>
        <td>N/A</td>
        <td>N/A</td>
      </tr>
    </tbody>
  </table>
</div>
    </>
  )
}

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