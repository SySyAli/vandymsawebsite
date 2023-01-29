import "./globals.css";
import Carousel from "./components/Carousel";
import NewCarousel from "./components/newCarousel";
import hdate from "human-date";
// 'tw-elements'

async function getPrayerTimes() {
  const url = await `http://localhost:4000/prayerTimes`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}
async function getPhotoUrls() {
  const url = await "http://localhost:4000/getPhotoLinks";
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}
async function getEvents() {
  const url = await "http://localhost:4000/getMSAEvents";
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}

// FIGURE OUT WHAT TO DO WITH CAROUSEL - AUTOMATIC OR BUTTONS/MANUAL
// FIGURE OUT TIME CONVERSION
export default async function Home() {
  const times: any = await getPrayerTimes();
  let photoUrls: any = await getPhotoUrls();
  const calendarEvents: any = await getEvents();
  

  const threeEvents: any = calendarEvents.events.slice(0, 1);
  photoUrls = photoUrls.results.slice(0, 10);

  /*
    <div className="alert shadow-lg w-full items-center justify-center">
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
  */
  //
  /*
  {params.links.map((link: any, i: any) =>{
                        <div>
                            <img src={link} alt={"image"+i+1}/>
                        </div>
                })}
  */
  // JUMMAH UPDATE NEEDS TO BE ADDED
  return (
    <div>
      <div className="flex flex-col gap-4 w-full align-center items-center justify-center">
        <div
          className="hero h-[50vh]"
          style={{
            backgroundImage: `url('https://www.commonapp.org/static/f14242e1e38d8f02ce26ed9f5e57c371/vanderbilt-university_277.jpg')`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Welcome to the Vanderbilt MSA!
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <div className="hidden lg:block lg:w-[50%]"><NewCarousel links={photoUrls}/></div>
          <div className="lg:w-[50%] px-2 flex flex-col gap-6 w-full items-center justify-center pb-6">
            <h1 className="font-bold text-3xl text-right">
              The Next MSA Event!{" "}
            </h1>
            {threeEvents.map((event: any, i: any) => {
              return (
                <div key={i}>
                  <Event event={event} />
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="lg:flex lg:align-center lg:items-center lg:justify-center w-full px-2 mb-6 lg:max-w-[300px]"><PrayerTable iTimes={times} /></div>
      </div>
    </div>
  );
}

// FIGURE OUT TIMEZONES
// current Prayer
function PrayerTable({ iTimes }: any) {
  return (
    <div className="flex flex-col align-center justify-center gap-4">
      <h1 className="font-bold text-3xl text-center">Prayer Times</h1>
      <h6 className="font-bold text-center">
        {iTimes.IslamicDate.month} {iTimes.IslamicDate.day},{" "}
        {iTimes.IslamicDate.year} {iTimes.currentTimeStamp}
      </h6>
      <table className="drop-shadow-lg table table-compact text-center border-seperate overflow-auto lg:w-full p-4">
        <thead>
          <tr>
            <th></th>
            <th>Prayer Time:</th>
            <th>Iqamah Time:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fajr:</td>
            <td className={iTimes.currentPrayer === "fajr" ? "font-bold" : ""}>
              {iTimes.prayerTimes.fajr === "undefined"
                ? "Loading"
                : iTimes.prayerTimes.fajr}
            </td>
            <td className={iTimes.currentPrayer === "fajr" ? "font-bold" : ""}>
              {iTimes.iqammahTimes.fajrIqamah === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.fajrIqamah}
            </td>
          </tr>
          <tr>
            <td>Sunrise:</td>
            <td
              className={
                iTimes.currentPrayer === "NoPrayerTime" ? "font-bold" : ""
              }
            >
              {iTimes.prayerTimes.sunrise === "undefined"
                ? "Loading"
                : iTimes.prayerTimes.sunrise}
            </td>
            <td
              className={
                iTimes.currentPrayer === "NoPrayerTime" ? "font-bold" : ""
              }
            >
              {iTimes.iqammahTimes.sunriseIqamah === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.sunriseIqamah}
            </td>
          </tr>
          <tr>
            <td>Zuhr:</td>
            <td className={iTimes.currentPrayer === "zuhur" ? "font-bold" : ""}>
              {iTimes.prayerTimes.zuhr === "undefined"
                ? "Loading"
                : iTimes.prayerTimes.zuhr}
            </td>
            <td className={iTimes.currentPrayer === "zuhur" ? "font-bold" : ""}>
              {iTimes.iqammahTimes.zuhrIqamah === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.zuhrIqamah}
            </td>
          </tr>
          <tr>
            <td>Asr:</td>
            <td className={iTimes.currentPrayer === "asr" ? "font-bold" : ""}>
              {iTimes.prayerTimes.asr === "undefined"
                ? "Loading"
                : iTimes.prayerTimes.asr}
            </td>
            <td className={iTimes.currentPrayer === "asr" ? "font-bold" : ""}>
              {iTimes.iqammahTimes.asrIqamah === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.asrIqamah}
            </td>
          </tr>
          <tr>
            <td>Maghrib:</td>
            <td
              className={iTimes.currentPrayer === "magrhib" ? "font-bold" : ""}
            >
              {iTimes.prayerTimes.maghrib === "undefined"
                ? "Loading"
                : iTimes.prayerTimes.maghrib}
            </td>
            <td
              className={iTimes.currentPrayer === "magrhib" ? "font-bold" : ""}
            >
              {iTimes.maghribIqamah === "undefined" ? (
                "Loading"
              ) : (
                <>{iTimes.maghribiqammah}</>
              )}
            </td>
          </tr>
          <tr>
            <td>Isha: </td>
            <td className={iTimes.currentPrayer === "isha" ? "font-bold" : ""}>
              {iTimes.prayerTimes.isha === "undefined"
                ? "Loading"
                : iTimes.prayerTimes.isha}
            </td>
            <td className={iTimes.currentPrayer === "isha" ? "font-bold" : ""}>
              {iTimes.iqammahTimes.ishaIqamah === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.ishaIqamah}
            </td>
          </tr>
          <tr>
            <td>First Jummah:</td>
            <td>
              {iTimes.iqammahTimes.firstJummahTime === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.firstJummahTime}
            </td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Second Jummah:</td>
            <td>
              {iTimes.iqammahTimes.secondJummahTime === "undefined"
                ? "Loading"
                : iTimes.iqammahTimes.secondJummahTime}
            </td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Event({ event }: any) {
  return (
    <div>
      <div className="card card-bordered glass bg-base-200 shadow-xl h-fit w-fit items-center justify-center">
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
            <p>
              Start Time:{" "}
              {hdate.prettyPrint(new Date(event.start.dateTime), {
                showTime: true,
              })}
            </p>
          ) : (
            <p></p>
          )}

          {event.end.dateTime !== undefined ? (
            <p>
              End Time:{" "}
              {hdate.prettyPrint(new Date(event.end.dateTime), {
                showTime: true,
              })}
            </p>
          ) : (
            <p></p>
          )}

          {event.start.date !== undefined ? (
            <p>Start Date: {hdate.prettyPrint(new Date(event.start.date))}</p>
          ) : (
            <p></p>
          )}

          {event.end.date !== undefined ? (
            <p>End Date: {hdate.prettyPrint(new Date(event.end.date))}</p>
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
