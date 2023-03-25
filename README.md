# vandymsawebsite

This repo contains the code for the Vanderbilt Muslim Student Association server. This server is built using TypeScript and provides four main routes for the Vanderbilt Muslim Student Association website. The routes are /getInstagramPosts, /prayerTimes, /getHalalFood, and /getPhotoLinks.

## Installation
To install the dependencies, run the following command:
```
npm install
```

## Running the Server
To start the server, run the following command:
```
npm start
```
This will start the server on http://localhost:8080.

## API Routes

### /getInstagramPosts
This route returns the latest Instagram posts from the Vanderbilt Muslim Student Association's Instagram account.

Example request:
```
GET /getInstagramPosts
```
Example response:
```
{
    "posts": [
        {
            "id": "123456789",
            "image": "https://www.example.com/image.jpg",
            "caption": "This is a caption",
            "permalink": "https://www.instagram.com/p/123456789/"
        },
        {
            "id": "987654321",
            "image": "https://www.example.com/image2.jpg",
            "caption": "This is another caption",
            "permalink": "https://www.instagram.com/p/987654321/"
        }
    ]
}
```
### /prayerTimes
This route returns the prayer times for Nashville, TN and the iqamah times for Vanderbilt's MSA.

Example request:
```
GET /prayerTimes
```
Example response:
```
{
	"maghribiqammah": "7:09PM",
	"prayerTimes": {
		"fajr": "05:41AM",
		"sunrise": "06:51AM",
		"zuhr": "12:55PM",
		"asr": "4:22PM",
		"maghrib": "6:59PM",
		"isha": "8:10PM"
	},
	"IslamicDate": {
		"day": "27",
		"month": "Shaban",
		"year": "1444"
	},
	"timezone": "America/Chicago",
	"currentTimeStamp": "8:26PM, 3/20/2023",
	"currentPrayer": "isha",
	"currentDay": 1,
	"iqammahTimes": {
		"_id": "64177d7a0945a902cb8bd59a",
		"fajrIqamah": "N/A",
		"sunriseIqamah": "N/A",
		...
	}
}
```
### /getHalalFood
This route returns a list of halal meat dishes in the Vanderbilt Dining Halls.

Example request:
```
GET /getHalalFood
```
Example response:
```
	"message": "Halal Food sent successfully",
	"allFood": [
		{
			"_id": "64177e9c252fb0079e5f585d",
			"everything": [
				{
					"diningHall": "XXXXXX",
					"message": "XXXX",
					"foodInformation": {
						"message": "",
						"Breakfast": {
							...
						},
						"Lunch": {
							"message": "LUNCH HAS ITEMS",
							"food": [
							  ...
              ]
						},
						"DailyOffering": {
							"message": "DAILY OFFERINGS HAS NO ITEMS"
						},
						"Dinner": {
							"message": "DINNER HAS NO ITEMS"
						},
						"Brunch": {
							"message": "BRUNCH HAS NO ITEMS"
						}
					}
				},
        ...
    }
```
    
### /getPhotoLinks
This route returns a list of photo links for the Vanderbilt Muslim Student Association website. This uses cloudinary

Example request:
```
GET /getPhotoLinks
```
Example response:
```
{
    "photos": [
        "https://www.example.com/photo1.jpg",
        "https://www.example.com/photo2.jpg",
        "https://www.example.com/photo3.jpg"
    ]
}
```
### Deployment
This server is deployed using fly.io. To deploy the server, run the following command:
```
flyctl deploy
```
This will build the TypeScript files and deploy the server to fly.io.
