/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response } from "express";
import axios from "axios";
import { InstagramType } from "../../types/instagram";
import Instagrams from "../../models/instagram";
const CONFIG = require("../../CONFIG.json");

async function refreshToken() {
	try {
		// If first time w/server
		const count = await Instagrams.count();
		if (count == 0) {
			const toBeAdded: any = new Instagrams({
				access_token: CONFIG.INSTAGRAM_TOKEN,
				token_type: "bearer",
				// Random Number so it won't be angry
				expires_in: 10000,
			});
			await toBeAdded.save();
			console.log("CREATED THING");
		}
		// there is something in the database, update the access token
		const oldAccessToken = await Instagrams.find();
		// use this oldAccessToken[0].access_token
		const response = await axios.get(
			`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${oldAccessToken[0].access_token}`
		);
		// update mongodb
		const data = await Instagrams.findByIdAndUpdate(
			{ _id: oldAccessToken[0]._id },
			{ $set: response.data }
		);
		console.log("UPDATED THING");
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function refreshPosts() {
	try {
		// GET IMAGES using basic facebook api
		const aToken = await Instagrams.find();
		const responseData = await axios.get(
			`https://graph.instagram.com/me/media?fields=username,caption,permalink,media_type,media_url,children%7Bmedia_url%7D&access_token=${aToken[0].access_token}`
		);
		// update mongodb
		const data = await Instagrams.findByIdAndUpdate(
			{ _id: aToken[0]._id },
			{ $set: { posts: responseData.data.data.slice(0, 11) } }
		);
		console.log("UPDATED Posts");
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function getInstagramPosts(req: Request, res: Response) {
	try {
		// GET IMAGES using basic facebook api
		const data = await Instagrams.find();
		res
			.status(200)
			.json({ message: "instagram posts", instagramPosts: data[0].posts });
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export { refreshToken, getInstagramPosts, refreshPosts };
