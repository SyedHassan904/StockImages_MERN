import dotenv from 'dotenv'
dotenv.config()
import firebaseAdmin from 'firebase-admin';
import userModel from '../models/userModel.js';
import { createJWT } from "../utils/utils.js";

// Firebase Admin Init
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});



// Firebase token verification route
const GoogleLoginController = async (req, res) => {
  const idToken = req.body.token;
  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    const { name, email, picture } = decoded;
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name: name || "No Name",
        email,
        password: null,
        provider: "google",
        profileURL: picture
      });
    }
    const token = createJWT(user, process.env.JWT_SECRET)
    res.json({
      success: true, user: {
        name: user.name,
        email: user.email,
        currency: user.currency,
        _id: user._id,
        createdAt: user.createdAt,
        profileURL: user.profileURL
      }, token: token
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export default GoogleLoginController