import "./globals.css";


async function getPrayerTimes() {
  const url = await `http://localhost:4000/prayerTimes`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const times: any = await getPrayerTimes()

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

      <h1>Photo Carousel</h1>

      <PrayerTable iTimes={times}/>
      <h1>Upcoming Events (Next 3)</h1>
      <h1>Maybe put calendar - ask rashid</h1>
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

function setActive(){

}
