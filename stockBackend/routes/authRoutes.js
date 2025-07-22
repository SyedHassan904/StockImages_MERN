import express from 'express';
import passport from 'passport';
import { googleCallback, logout, getUser } from '../controllers/oAuth.js';
import Auth from '../controllers/Auth.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js'

const { RegisterUser, LoginUser, adminLogin, verifyAdmin, updateUser, forgotPassword, resetPassword } = Auth
const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login`, failureMessage: true }),
    googleCallback
);
authRouter.get('/logout', isAuth, logout);
authRouter.get('admin/logout', isAdmin, logout);
authRouter.get('/user', isAuth, getUser);
authRouter.post("/register", RegisterUser)
authRouter.post("/login", LoginUser)
authRouter.post("/admin/login", adminLogin)
authRouter.get("/admin/verify", isAdmin, verifyAdmin)
authRouter.put("/updateuser", isAuth, updateUser)
authRouter.post("/forgotpassword", forgotPassword)
authRouter.post("/reset-password", resetPassword)


export default authRouter;
