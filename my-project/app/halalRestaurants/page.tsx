import React from "react";

async function getHalalRestaurants() {
  const url = "http://localhost:4000";
  const res = await fetch(url + `/getHalalRestaurants`, { cache: "no-store" });
  const data = res.json();
  return data;
}

export default async function HalalRestaurants() {
  const restaurants: any = await getHalalRestaurants();

  return (
    <>
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
      Halal Restaurants
    </h1>
    <div>
        {restaurants.allRestaurants.map((post: any) =>{
        return(
            <div className="" key={post._id}><Restaurant info={post}/></div>
        )
    })}
    </div>
    </>

  );
}

function Restaurant({ info }: any) {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
      <a  className="link" href={info.website}><h2 className="card-title">{info.name}</h2></a>
        <figure>
          <img src={info.imageUrl} />
        </figure>
        <div className="card-body">
        <div>
            <p>Is this on Meal Money? {info.onMealMoney.toString()}</p>
        </div>
        <div>
            <p>Location: {info.address}</p>
        </div>
        <p>Link: <a className="link">{info.website}</a></p>
        <p>{info.note}</p>
        </div>
      </div>
    </>
  );
}
