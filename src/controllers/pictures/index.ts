/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
//const CONFIG = require("../../CONFIG.json");
import PhotoLinks from "../../models/photoLinks";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

// NEW METHODS
async function getImages() {
	try {
		const newURLS: string[] = [];
		const promise = new Promise((resolve, reject) => {
			cloudinary.search
				.expression("resource_type:image")
				.sort_by("created_at", "desc")
				.execute()
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					console.error(error);
				});
		});

		const result: any = await promise; // wait until the promise resolves (*)
		for (let i = 0; i < result.resources.length; i++) {
			const newImage = await cloudinary.image(result.resources[i].public_id, {
				format: "webp",
				width: 720,
				height: 420,
				crop: "fill",
			});
			const stringURL = newImage.substring(
				newImage.indexOf("src='") + 5,
				newImage.indexOf("' height=")
			);
			newURLS.push(stringURL);
		}
		return newURLS;

		//console.log(result);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function refreshPhotos() {
	try {
		//
		const newURLS = await PhotoLinks.find();
		if (newURLS.length === 0) {
			const newPhotoLinks = new PhotoLinks({
				links: await getImages(),
			});
			await newPhotoLinks.save();
			console.log("created new pictures");
		} else {
			const newURLSREPLACE = await getImages();
			const data = await PhotoLinks.findByIdAndUpdate(
				{ _id: newURLS[0]._id },
				{ $set: { links: newURLSREPLACE } }
			);
			console.log("updated pictures");
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getPictureLinks(req: Request, res: Response) {
	try {
		const photolinks = await PhotoLinks.find();
		res.status(200).json({ results: photolinks[0].links });
	} catch (error) {
		console.log(error);
		throw error;
	}
}
/*
const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.JWT(
	CONFIG.GOOGLE_DRIVE_CLIENT_EMAIL,
	undefined,
	CONFIG.GOOGLE_PRIVATE_KEY,
	scopes
);

const drive = google.drive({ version: "v3", auth });

async function getAllPhotoLinks() {
	try {
		const linksArray: any = [];
		// get ids, then put it into links
		const results = await drive.files.list({
			q: `'${CONFIG.GOOGLE_IMAGE_FOLDER}' in parents`,
		});
		if (results.data.files !== undefined) {
			// && results.data.files[i].mimeType.indexOf("jpeg") > 0
			for (let i = 0; i < results.data.files.length; i++) {
				if (
					results.data.files[i].mimeType !== undefined &&
					results.data.files[i].mimeType !== null &&
					results.data.files[i].mimeType === "image/webp"
				) {
					linksArray.push(
						`https://drive.google.com/uc?export=view&id=${results.data.files[i].id}`
					);
				}
			}
			return linksArray;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function getGooglePhotoLinks(req: Request, res: Response) {
	try {
		const googleAPISDB = await googleapis.find();
		res.status(200).json({ results: googleAPISDB[0].photoLinks });
	} catch (error) {
		console.log(error);
		throw error;
	}
}
*/
export { refreshPhotos, getPictureLinks };
