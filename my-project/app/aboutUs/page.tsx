export default async function aboutUs() {
	return (
		<div className="flex flex-col gap-4 text-center">
			<div>
				<p>
					Welcome to the Vanderbilt Muslim Student Association (Vanderbilt MSA)
					website! Our organization is dedicated to serving the Muslim student
					community at Vanderbilt University and promoting understanding,
					respect, and friendship between people of all religions and cultures.
				</p>
			</div>
			<div id="msahistory" className="">
				<div>
					<h1>MSA History</h1>
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
				<h1>MSA Board</h1>
				<p>
					The Vanderbilt MSA is governed by a board of student leaders who are
					elected annually by the membership. The board is responsible for
					overseeing the organization's programs, events, and finances, as well
					as representing the interests of the Muslim student community on
					campus. If you are interested in joining the board or getting involved
					with the Vanderbilt MSA, please contact us at [insert email address].
					TODO: ADD CARDS FOR EACH BOARD MEMBER
				</p>
			</div>
			<div id="prayerspaces" className="">
				<h1>Prayer Spaces on Campus</h1>
				<p>
					The Vanderbilt MSA provides access to several prayer spaces on campus,
					including the Islamic Center of Nashville, the Multicultural Student
					Life Center, and the Office of Religious Life. These spaces are
					available for students to use for daily prayers, Jummah (Friday)
					prayers, and special events. TODO: ADD CARDS FOR EACH PRAYER SPACE
				</p>
			</div>
			<div id="otherorgs" className="">
				<h1>Adjacent Orgs</h1>
				<p>
					The Vanderbilt MSA is proud to be part of a vibrant and supportive
					community of organizations that share our mission to promote
					diversity, inclusivity, and cultural exchange on campus. Our neighbors
					include the Office of Religious Life, the Multicultural Student Life
					Office, the Center for Student Wellbeing, and the Office of LGBTQI
					Life, all of which provide a wide range of resources and programs
					aimed at promoting equality and well-being for all students. TODO: ADD
					CARDS FOR ORG
				</p>
			</div>
			<div id="nashvillecom" className="">
				<h1>Nashville Community</h1>
				<p>
					Vanderbilt is located in the heart of Nashville, one of the most
					vibrant and diverse cities in the country. The Nashville Muslim
					community is an active and growing part of the city's cultural
					landscape, offering a wide range of events, services, and
					organizations for students to get involved with. If you are looking
					for a mosque or Islamic center to attend, or simply want to explore
					the local Muslim community, we encourage you to visit the Islamic
					Center of Nashville's website or contact us for more information.
					TODO: ADD CARDS FOR NASHVILLE COMMUNITY ORG
				</p>
			</div>
			<div id="donate" className="">
				<h1>Donate</h1>
				<p>
					The Vanderbilt MSA is a student-run organization that relies on the
					generosity of donors to support its programs and events. If you would
					like to make a donation to the Vanderbilt MSA, please visit our
					[insert website link] and select the "Donate" button. Your support is
					greatly appreciated and will help us continue to serve the Muslim
					student community at Vanderbilt.
				</p>
			</div>
		</div>
	);
}
