import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import mongoDB from './config/mongodb.js'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import Cloudinary from './config/cloudinary.js';
import imageRoute from './routes/imageRoute.js';
import imageStatRoute from './routes/imageStatRoute.js';
import wishlisstRoute from './routes/wishlistRoute.js';
import paymentRoute from './routes/paymentRoute.js'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 5000
mongoDB();
Cloudinary();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.urlencoded({ urlencoded: true }));
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use("/auth", authRouter);
app.use("/stock", imageRoute);
app.use("/stat-api", imageStatRoute)
app.use("/wishlist-api", wishlisstRoute)
app.use("/api", paymentRoute)



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
