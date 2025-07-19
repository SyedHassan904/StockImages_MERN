import express from 'express';
const wishlisstRoute = express.Router();
import isAuth from '../middlewares/isAuth.js'
import wishlistController from '../controllers/wishlistController.js';

const { addToWishList, removeFromWishlist, getWishlist } = wishlistController

wishlisstRoute.post("/wishlist/add/:imageid", isAuth, addToWishList);
wishlisstRoute.delete("/wishlist/remove/:imageid", isAuth, removeFromWishlist)
wishlisstRoute.get("/wishlist", isAuth, getWishlist)

export default wishlisstRoute;