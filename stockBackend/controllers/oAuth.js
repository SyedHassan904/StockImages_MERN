
import userModel from '../models/userModel.js';
import { createJWT } from '../utils/utils.js';
import jwt from 'jsonwebtoken';



export const googleCallback = (req, res) => {
  const token = createJWT(req.user);
  res.cookie('token', token, {
    httpOnly: true,
    secure:false
  });
  res.redirect(process.env.FRONTEND_URL);
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};

export const getUser = async(req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: user });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
