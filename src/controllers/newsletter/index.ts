import {Request, Response} from "express"
import {Newsletter} from "../../types/newsletter"
import Newsletters from "../../models/newsletter"
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })


// Read Images
async function getNewsletters(req: Request, res: Response){
    try {
        //
        const allNewsLetters: Newsletter[] = await Newsletters.find()
        res.status(200).json({"message":"newsletters sent successfully", "All Newsletters": allNewsLetters})

    } catch (error) {
        console.log(error)
        throw error
    }
}

// Create an Image - Take data from the Cloudinary Uploader
// Date passed in manually
async function addNewsletter(req: Request, res: Response){
    try {
        const body = req.body as Pick<Newsletter, "pdfUrl" | "date" >
        const NewsletterToBeAdded: Newsletter = new Newsletters({
            "imageUrl": body.pdfUrl,
            "date": body.date
        })
        const added: Newsletter = await NewsletterToBeAdded.save()
        const allNewsletters: Newsletter[] = await Newsletters.find()
        res.status(200).json({"message":"Newsletter added successfully", "Newsletter Added": added, "Newsletters": allNewsletters})

    } catch (error) {
        console.log(error)
        throw error
    }
}


// Update an Image
async function updateNewsletter(req: Request, res: Response){
    try {
        //
        const body = {"id": req.params.id, "body": req.body}
        // change if imageurl
        if(body.body.pdfUrl != undefined){
            const result = await cloudinary.v2.uploader.upload(body.body.pdfUrl)
            body.body.imageUrl = result.secure_url
        }

        const updated: Newsletter | null = await Newsletters.findByIdAndUpdate({"_id": body.id}, {$set: body.body})
        const all: Newsletter[] = await Newsletters.find()
        res.status(200).json({"message":"Newsletter successfully updated", "Updated Newsletter:": updated, "All Newsletters": all})
    } catch (error) {
        console.log(error)
        throw error
    }
}



// Delete an Image
async function deleteNewsletter(req: Request, res: Response){
    try {
        const body = {"id": req.params.id, "body": req.body}
        const deleted: Newsletter | null = await Newsletters.findByIdAndDelete(body.id, body.body)
        const all: Newsletter[] = await Newsletters.find()
        res.status(200).json({"message": "Newsletter successfully deleted", "Deleted Newsletter": deleted, "All Newsletters": all})

    } catch (error) {
        console.log(error)
        throw error
    }
}


export {getNewsletters, addNewsletter, updateNewsletter, deleteNewsletter}

