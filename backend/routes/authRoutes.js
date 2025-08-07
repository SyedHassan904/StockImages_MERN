import express from 'express';
import GoogleLoginController from '../controllers/GoogleAuthController.js'
import Auth from '../controllers/Auth.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js'

const { RegisterUser, LoginUser, adminLogin, verifyAdmin, updateUser, getUser,forgotPassword,resetPassword} = Auth
const authRouter = express.Router();


authRouter.post("/verify-token",GoogleLoginController)
authRouter.get('/user', getUser);
authRouter.post("/register", RegisterUser)
authRouter.post("/login", LoginUser)
authRouter.post("/admin/login", adminLogin)
authRouter.get("/admin/verify", isAdmin, verifyAdmin)
authRouter.put("/updateuser", isAuth, updateUser)
authRouter.post("/forgotpassword", forgotPassword)
authRouter.post("/reset-password", resetPassword)


export default authRouter;
