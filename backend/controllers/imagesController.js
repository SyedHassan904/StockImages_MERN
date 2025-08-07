import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import imageModel from "../models/imageModel.js";
import userModel from "../models/userModel.js";

const addImages = async (req, res) => {
    const { title, description, category, tags, pricePKR, priceUSD } = req.body;
    const image1 = req.file;
    let imageUrl = null;
    let waterMarkedURL = null;
    try {
        if (image1) {
            const result = await cloudinary.uploader.upload(image1.path, { resource_type: 'image', folder: 'stock' });
            imageUrl = result.secure_url;
            fs.unlinkSync(image1.path)
            const publicId = result.public_id;
            waterMarkedURL = cloudinary.url(publicId, {
                transformation: [
                    {
                        overlay: {
                            font_family: 'Arial',
                            font_size: 200,
                            text: 'WATERMARKED IMAGE',
                        },
                        gravity: 'center',
                        color: '#888888',       // ✅ Neutral gray
                        opacity: 40,            // ✅ Semi-transparent
                        angle: -30,             // Optional: rotated
                        effect: 'shadow',       // ✅ Simulates an outline for contrast
                    },
                ],
            });
        } else {
            return res.json({ success: false, message: "Add Image" })
        }

        const image = await imageModel.create({
            title,
            description,
            category,
            tags: JSON.parse(tags),
            pricePKR: Number(pricePKR),
            priceUSD: Number(priceUSD),
            fileUrl: imageUrl,
            waterMarkedURL
        })
        res.json({ success: true, message: "Image added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const removeImage = async (req, res) => {
    const { imageID } = req.body;
    try {
        const image = await imageModel.findById(imageID);
        if (!image) {
            return res.json({ success: false, message: "Image not found" })
        }
        const fileUrl = image.fileUrl;
        const publicId = fileUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        await imageModel.findByIdAndDelete(imageID);
        res.json({ success: true, message: "Image deleted from DB and Cloudinary" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateImage = async (req, res) => {
    const { imageID, title, description, category, tags, pricePKR, priceUSD } = req.body;
    try {
        let image = await imageModel.findById(imageID);
        if (!image) {
            return res.json({ success: false, message: "Image not found" });
        }

        image.title = title || image.title;
        image.description = description || image.description;
        image.category = category || image.category;
        image.tags = tags || image.tags;
        image.pricePKR = pricePKR || image.pricePKR;
        image.priceUSD = priceUSD || image.priceUSD;

        await image.save()
        res.json({ success: true, message: "Image updated successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getSingleImage = async (req, res) => {
    const { imageID } = req.body;
    try {
        const image = await imageModel.findById(imageID);
        if (!image) {
            return res.json({ success: false, message: "Image not found" });
        }
        res.json({ success: true, image: image });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const getAllImages = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = category
            ? { category: { $regex: new RegExp(`^${category}$`, 'i') } } // exact category
            : {};

        const images = await imageModel.find(filter);

        res.json({ success: true, images });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const searchImage = async (req, res) => {
    const { query } = req.query;
    try {
        if (!query) {
            return res.status(400).json({ success: false, message: "Query is required" });
        }
        const regex = new RegExp(query, 'i');
        const results = await imageModel.find({
            $or: [
                { title: regex },
                { description: regex },
                { category: regex },
                { tags: { $in: [regex] } }
            ]
        });
        res.status(200).json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


const getCategoriesWithCounts = async (req, res) => {
    try {
        const categories = await imageModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    firstImage: { $first: "$fileUrl" } 
                }
            },
            { $sort: { count: -1 } }
        ]);

        const formatted = categories.map(cat => ({
            _id: cat._id,
            count: cat.count,
            coverImage: cat.firstImage
        }));

        res.json({ success: true, categories: formatted });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getDownloadedImages=async(req,res)=>{
    const {id} = req.user;
    try {
        const user = await userModel.findById(id).populate("downloadedImages");
        const downloadedImages = user.downloadedImages;
        res.json({success:true, downloadedImages:downloadedImages})

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export default { addImages, removeImage, updateImage, getSingleImage, getAllImages, searchImage, getCategoriesWithCounts, getDownloadedImages }