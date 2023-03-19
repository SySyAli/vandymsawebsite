export default async function aboutUs() {
	return (
		<div className="flex flex-col gap-4 text-center items-center justify-center">
			<div>
				<p className="font-bold text-xl">
					Welcome to the Vanderbilt Muslim Student Association (Vandy MSA)
					website! Our organization is dedicated to serving the Muslim student
					community at Vanderbilt University and promoting understanding,
					respect, and friendship between people of all religions and cultures.
				</p>
			</div>
			<div id="msahistory" className="">
				<div>
					<h1 className="font-bold text-xl">MSA History</h1>
					<p>
						The Vanderbilt MSA was established in the early 2000s as a
						student-led initiative to create a welcoming and supportive space
						for Muslim students at Vanderbilt. Over the years, the Vanderbilt
						MSA has grown to become one of the most active and vibrant student
						organizations on campus, offering a wide range of programs, events,
						and services to its members. Our mission is to promote a positive
						and inclusive environment for Muslims on campus and to build bridges
						of understanding and respect with other communities.
					</p>
				</div>
			</div>
			<div id="board" className="">
				<h1 className="font-bold text-xl">MSA Board</h1>
				<p>
					The Vanderbilt MSA is governed by a board of student leaders who are
					elected annually by the membership. The board is responsible for
					overseeing the organization's programs, events, and finances, as well
					as representing the interests of the Muslim student community on
					campus. More to come!
				</p>
			</div>
			<div id="otherorgs" className="">
				<h1 className="font-bold text-xl">Adjacent Orgs</h1>
				<p>
					The Vanderbilt MSA is proud to be part of a vibrant and supportive
					community of organizations that share our mission to promote
					diversity, inclusivity, and cultural exchange on campus. Some adjacent
					organizations include: Pakistani Student Association, Vanderbilt
					Association of Bangladeshi Students, Middle Eastern Student
					Assocaition, African Student Union, Ethiopian-Eritrean Student
					Association, Vanderbilt Interfaith Council, Asian American Student
					Association, South Asian Cultural Exchange, Multicultural Leadership
					Council, and Dores in Solidarity with Palestine.
				</p>
			</div>
			<div id="nashvillecom" className="">
				<h1 className="font-bold text-xl">Nashville Community</h1>
				<p>
					Vanderbilt is located in the heart of Nashville, one of the most
					vibrant and diverse cities in the country. The Nashville Muslim
					community is an active and growing part of the city's cultural
					landscape, offering a wide range of events, services, and
					organizations for students to get involved with. If you are looking
					for a mosque or Islamic center to attend, or simply want to explore
					the local Muslim community, we encourage you to visit the Islamic
					Center of Nashville's website or contact us for more information.
					These would include: Islamic Center of Nashville, Al-Farooq Islamic
					Center, Salahadeen Center of Nashville, Islamic Center of Tennessee,
					the Islamic Center of Murfreesboro, Islamic Center of Nashville at
					Bellevue, Imam Mahdi Islamic Centre, Al Zahra Center of Nashville,
					Islamic Center of Williamson County, and much more.
				</p>
			</div>
			<div id="prayerspaces" className="">
				<h1 className="font-bold text-xl">Prayer Spaces on Campus</h1>
				<p>
					The Vanderbilt has several prayer spaces on campus. The main one being
					the Annex, located on 411 24th Ave S, Nashville, TN 37212. There is
					also the Commons Contemplation Room, which is located on the second
					floor of the Commons Center. There is also the Rand Contemplation
					Room. Another praying space is located in the Multicultural Community
					Space. There is also All Faith Chapel, which is located directly below
					Benton Chapel, and Eskind Library's second floor contemplation room.
					There are also meditation rooms in Rothschild and Zeppos Residental
					Colleges. A map of the spaces:{" "}
					<a
						className="link"
						target="_blank"
						href={
							"https://www.google.com/maps/d/u/0/edit?mid=1l7ACbCOblyE5p45Lzk7JpYQZSujq6O0&usp=sharing"
						}
					>
						Vanderbilt Praying Spaces Map
					</a>
					.
				</p>
			</div>
			<div className="hidden lg:flex lg:align-center rounded-lg lg:items-center lg:justify-center lg:h-fit w-full">
				<iframe
					src="https://www.google.com/maps/d/embed?mid=1l7ACbCOblyE5p45Lzk7JpYQZSujq6O0&ehbc=2E312F"
					height="640px"
					width="100%"
					loading="lazy"
				></iframe>
			</div>
		</div>
	);
}
