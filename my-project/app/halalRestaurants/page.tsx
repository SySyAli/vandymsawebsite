import React from "react";


export default async function HalalRestaurants() {

	return (
		<>
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
				Halal Restaurants
			</h1>
			<h3>Here is a list of Halal Restaurants located near campus:</h3>
			<ul>
				<li>Satay Thai</li>
				<li>Sitar Indian Cusine</li>
				<li>Bombay Palace</li>
				<li>Inchin's Bamboo Garden</li>
			</ul>
			<h3>Here is a list of Halal Restaurants located in Nashville:</h3>
			<ul>
				<li>Halal Gyros</li>
				<li>Baam Burger</li>
				<li>Lyra Restaurant</li>
				<li>The Horn</li>
				<li>Cava</li>
				<li>Magic Way Steak & Gyros</li>
				<li>Leaf & Brew</li>
				<li>Taziki’s Cafe</li>
				<li>Smokin Chicken</li>
				<li>House of Kabob</li>
				<li>Istanbul</li>
				<li>Edessa</li>
				<li>Osh Restaurant & Grill</li>
				<li>Taste of India</li>
				<li>Fattoush Cafe</li>
				<li>Green Chili Indian</li>
				<li>Taj Indian</li>
				<li>Anatolia Turkish</li>
				<li>Saffron the Indian Kitchen</li> 
        <li>Mazi International Market</li>
				<li>Al Rasoul Market</li>
				<li>Newroz Market</li> 
        <li>Azadi International</li>
			</ul>

			
		</>
	);
}
/*
function Restaurant({ info }: any) {
	return (
		<>
			<div className="card w-96 bg-base-100 shadow-xl">
				<a className="link" href={info.website}>
					<h2 className="card-title">{info.name}</h2>
				</a>
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
					<p>
						Link: <a className="link">{info.website}</a>
					</p>
					<p>{info.note}</p>
				</div>
			</div>
		</>
	);
}
*/