import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/userModel.js';
import geoip from 'geoip-lite';


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const profileURL=profile.photos[0].value;
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
        if (!user) {
          user = await userModel.create({
            name,
            email,
            password: null,
            provider: 'google',
            currency: detectedCurrency,
            profileURL
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    })
);
