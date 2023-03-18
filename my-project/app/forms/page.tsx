export default async function forms() {
	return (
		<div className="flex flex-wrap flex-col items-center justify-center text-center gap-4">
			<div className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
				Forms
			</div>
			<div>
				<p>
					Here are some important forms that we use below:
					<ul>
						<li>
							The{" "}
							<a
								className="link"
								target="_blank"
								href={
									"https://docs.google.com/spreadsheets/d/1QcS8C0t2sxa9YsfFy5MqwOrl-ekE8t8xNtcF73R9tGw/edit?usp=sharing"
								}
							>
								Khateeb Sign Up Sheet
							</a>{" "}
							is used by those who want to sign up to be a Khateeb and give a
							Khutbah for Jummah.
						</li>
						<li>
							The{" "}
							<a
								className="link"
								target="_blank"
								href={"https://forms.gle/fAu1aNoEz5m2XGqk6"}
							>
								Feedback Form
							</a>{" "}
							is used to give Feedback for the MSA.
						</li>
						<li>
							The{" "}
							<a
								className="link"
								target="_blank"
								href={"https://forms.gle/vXjHfx24Snz5s9y48"}
							>
								Roommate Selection Form
							</a>{" "}
							is used by those looking for prospective roommates for the
							upcoming academic year.
						</li>
						<li>
							The{" "}
							<a
								className="link"
								target="_blank"
								href={
									"https://vanderbilt.alumniq.com/giving/to/muslimstudentassociation?appealcode=A-00000251"
								}
							>
								Donation Form
							</a>{" "}
							is used by those looking to donate to our MSA. The Vanderbilt
							Muslim Students Association is a small but thriving community of
							young Muslims aspiring to work on their faith and grow together.
							Donations such as these contribute to our community life by
							helping to fund our halaqas, masjid outings, prayer space
							renovations, and Ramadan planning. We appreciate every dollar and
							will work to ensure it is put towards worthwhile causes. May Allah
							swt bless you and your family. Thank you!
						</li>
					</ul>
				</p>
			</div>
			<div id="khutbah" className="">
				<a
					className="link"
					target="_blank"
					href={
						"https://docs.google.com/spreadsheets/d/1QcS8C0t2sxa9YsfFy5MqwOrl-ekE8t8xNtcF73R9tGw/edit?usp=sharing"
					}
				>
					Khateeb Sign Up Sheet
				</a>
			</div>
			<div id="feedback" className="">
				<a
					className="link"
					target="_blank"
					href={"https://forms.gle/fAu1aNoEz5m2XGqk6"}
				>
					Feedback Form
				</a>{" "}
			</div>
			<div id="roommate" className="">
				<a
					className="link"
					target="_blank"
					href={"https://forms.gle/vXjHfx24Snz5s9y48"}
				>
					Roommate Selection Form
				</a>
			</div>
			<div id="donate" className="">
				<a
					className="link"
					target="_blank"
					href={
						"https://vanderbilt.alumniq.com/giving/to/muslimstudentassociation?appealcode=A-00000251"
					}
				>
					Donation Form
				</a>{" "}
			</div>
		</div>
	);
}
