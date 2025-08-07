import express from 'express';
const imageStatRoute = express.Router();
import isAdmin from '../middlewares/isAdmin.js';
import imageStatController from '../controllers/imageStatController.js';

const { trackImpression, trackClick, getAllImageStats, getStatSingleImage } = imageStatController


imageStatRoute.post("/images/:id/impression", trackImpression)
imageStatRoute.post("/images/:id/click", trackClick)
imageStatRoute.get("/admin/stats", isAdmin, getAllImageStats)
imageStatRoute.get("/admin/:id/stat", isAdmin, getStatSingleImage)

export default imageStatRoute