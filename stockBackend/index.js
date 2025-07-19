import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import mongoDB from './config/mongodb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import './config/passport.js'
import authRouter from './routes/authRoutes.js';
import Cloudinary from './config/cloudinary.js';
import imageRoute from './routes/imageRoute.js';
import session from 'express-session';
import imageStatRoute from './routes/imageStatRoute.js';
import wishlisstRoute from './routes/wishlistRoute.js';
import paymentRoute from './routes/paymentRoute.js'
import  router from './controllers/jazzCash.js';

const PORT = process.env.PORT || 3000
mongoDB();
Cloudinary();

const app = express();

const allowedOrigin = 'https://stock-images-mern.vercel.app/';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));


app.use(
  session({
    secret: process.env.SECRET, // 🔒 should be stored in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);





app.use(express.urlencoded({urlencoded:true}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use("/auth",authRouter);
app.use("/stock",imageRoute);
app.use("/stat-api",imageStatRoute)
app.use("/wishlist-api",wishlisstRoute)
app.use("/api",paymentRoute)
app.use("/",router)


app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`)
})
