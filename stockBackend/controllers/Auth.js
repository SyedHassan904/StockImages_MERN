import userModel from "../models/userModel.js";
import geoip from 'geoip-lite';
import bcrypt from 'bcrypt'
import { createJWT } from "../utils/utils.js";
import jwt from 'jsonwebtoken'
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary'
import randomstring from "randomstring";
import main from "../config/nodemailer.js";
import createHashPassword from "../utils/createHashPassword.js";

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    const defaultUser = "https://res.cloudinary.com/dxrkiij3z/image/upload/v1752929917/user-profile-icon_csrlln.jpg"
    let ip =
        req.headers['x-forwarded-for']?.split(',').shift()?.trim() ||
        req.socket?.remoteAddress ||
        req.ip;

    if (ip === '::1' || ip === '127.0.0.1') {
        ip = '103.255.6.4';
    }
    const geo = geoip.lookup(ip);
    const detectedCurrency = geo?.country === 'PK' ? 'PKR' : 'USD';
    try {
        let user = await userModel.findOne({ email });
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter valid email" });
        }
        if (user) {
            return res.json({ success: false, message: "user is already register" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "please enter password more than 8 characters" })
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const user = await userModel.create({
                    name,
                    email,
                    password: hash,
                    profileURL: defaultUser,
                    currency: detectedCurrency
                })
                const token = createJWT(user)
                res.cookie('token', token, {
                    httpOnly: true,
                });
                res.json({
                    success: true,
                    message: "Register Success",
                    user: {
                        name: user.name,
                        email: user.email,
                        currency: user.currency,
                        _id: user._id,
                        createdAt: user.createdAt,
                        profileURL: user.profileURL
                    }
                });
            })
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid Ceredentials" });
        }
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
            const token = createJWT(user);
            res.cookie("token", token, {
                httpOnly: true
            });

            res.json({
                success: true,
                message: "login Success",
                user: {
                    name: user.name,
                    email: user.email,
                    currency: user.currency,
                    _id: user._id,
                    createdAt: user.createdAt,
                    profileURL: user.profileURL
                }
            });
        } else {
            return res.json({ success: false, message: "Invalid Ceredentials" })
        }



    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.cookie("token", token, {
                httpOnly: true
            })
            res.json({ success: true, message: "Admin login successfully", user: { email: email, role: "admin", name: "Syed Hassan" } })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



const updateUser = async (req, res) => {
    const { name, email, avatar } = req.body;
    const { id } = req.user;
    let profileURL = null
    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter valid email" });
        }
        if (avatar && avatar.startsWith('data:image')) {
            const res = await cloudinary.uploader.upload(avatar, {
                resource_type: "image",
                folder: "profileImages"
            })
            profileURL = res.secure_url;
        }
        const user = await userModel.findById(id).select('-password');
        user.name = name || user.name;
        user.email = email || user.email;
        user.profileURL = profileURL || user.profileURL
        await user.save();
        res.json({success:true,updatedUser:user});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


const verifyAdmin = (req, res) => {
    const token = req.cookies.token; // ✅ expects JWT in cookie

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Optional: check if user role is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        res.status(200).json({ user: decoded });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        const token = randomstring.generate();
        const updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { $set: { "token": token } }, { new: true });
        main(email, token)
        res.json({ success: true, message: "Check your inbox" })



    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}


const resetPassword = async (req, res) => {
    // const { token } = req.query;
    const { token,newPassword } = req.body
    try {
        console.log("Token received:", token);
        let user = await userModel.findOne({ token });
        if (!user) {
            return res.json({ success: false, message: "The token has been expired" });
        }
        const hashPassword = await createHashPassword(newPassword);
        let updatedUser = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { "password": hashPassword, "token": "" } },{new:true})
        res.json({success:true,message:"password reset successfully"});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default { RegisterUser, LoginUser, adminLogin, verifyAdmin, updateUser, forgotPassword ,resetPassword}
