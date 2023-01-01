import {Request, Response} from "express"
import {Picture} from "../../types/picture"
import Pictures from "../../models/picture"
import cloudinary from "cloudinary"
import isImage from "is-image"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })


// Read Images
async function getPictures(req: Request, res: Response){
    try {
        //
        const allPictures: Picture[] = await Pictures.find()
        res.status(200).json({"message":"pictures sent successfully", "All Pictures": allPictures})

    } catch (error) {
        console.log(error)
        throw error
    }
}

// Create an Image - Take data from the Cloudinary Uploader
// Figure out what to do with the Date because upload date might not match event Date, or pass in event Date
async function addPicture(req: Request, res: Response){
    try {
        const body = req.body as Pick<Picture, "imageUrl" | "date" | "eventName">
        // Checks if Valid Image
        if(!isImage(body.imageUrl)){
            throw new Error('Invalid Image Link/Path')
        }
        const PictureToBeAdded: Picture = new Pictures({
            "imageUrl": body.imageUrl,
            "date": body.date,
            "eventName": body.eventName
        })
        const added: Picture = await PictureToBeAdded.save()
        const allPictures: Picture[] = await Pictures.find()
        res.status(200).json({"message":"picture added successfully", "pictureAdded": added, "Pictures": allPictures})

    } catch (error) {
        console.log(error)
        throw error
    }
}


// Update an Image
async function updatePicture(req: Request, res: Response){
    try {
        //
        const body = {"id": req.params.id, "body": req.body}
        // change if imageurl
        if(body.body.imageUrl != undefined){
            if(!isImage(body.body.imageUrl)){
                throw new Error('Invalid Image Link/Path')
            }
            const result = await cloudinary.v2.uploader.upload(body.body.imageUrl)
            body.body.imageUrl = result.secure_url
        }

        const updated: Picture | null = await Pictures.findByIdAndUpdate({"_id": body.id}, {$set: body.body})
        const all: Picture[] = await Pictures.find()
        res.status(200).json({"message":"Pictures successfully updated", "Updated Picture:": updated, "All Pictures": all})
    } catch (error) {
        console.log(error)
        throw error
    }
}



// Delete an Image
async function deletePicture(req: Request, res: Response){
    try {
        const body = {"id": req.params.id, "body": req.body}
        const deleted: Picture | null = await Pictures.findByIdAndDelete(body.id, body.body)
        const all: Picture[] = await Pictures.find()
        res.status(200).json({"message": "Picture successfully deleted", "Deleted Picture": deleted, "All Pictures": all})

    } catch (error) {
        console.log(error)
        throw error
    }
}


export {getPictures, addPicture, updatePicture, deletePicture}

