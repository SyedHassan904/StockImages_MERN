import express from 'express';
const imageRoute = express.Router();
import upload from '../middlewares/multer.js'
import isAdmin from '../middlewares/isAdmin.js'
import imagesController from '../controllers/imagesController.js';
import isAuth from '../middlewares/isAuth.js';


const { addImages, removeImage, updateImage, getSingleImage, getAllImages, searchImage, getCategoriesWithCounts, getDownloadedImages } = imagesController


imageRoute.post("/admin/upload", isAdmin, upload.single("image"), addImages)
imageRoute.delete("/admin/remove", isAdmin, removeImage);
imageRoute.put("/admin/update", isAdmin, updateImage);
imageRoute.post("/single", getSingleImage);
imageRoute.get("/list", getAllImages)
imageRoute.get("/search", searchImage)
imageRoute.get("/categories", getCategoriesWithCounts);
imageRoute.get("/downloaded",isAuth,getDownloadedImages);

export default imageRoute