import express from 'express';
const paymentRoute = express.Router();
import isAuth from '../middlewares/isAuth.js'
import paymentController from '../controllers/paymentController.js';

const { getPaymentHistory, downloadImage } = paymentController

paymentRoute.get("/payments/history", isAuth, getPaymentHistory);
paymentRoute.get("/images/download/:id", isAuth, downloadImage)


export default paymentRoute;