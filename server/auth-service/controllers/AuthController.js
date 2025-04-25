const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt.utils");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.RegisterWithEmail = async (req, res, next) => {
   try {
      const { email, username, password, phone } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         res.status(400).json({
            success: false,
            error: { message: 'User with this email exists. Try Login.' },
            data: null
         });
         return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const newUser = await User.create({
         username,
         email,
         password: hashedPassword,
         phone,
         enabled: true,
         role: "User",
      });
      
      const accessToken = generateAccessToken({ id: newUser._id, role: newUser.role })
      const refreshToken = generateRefreshToken({ id: newUser._id, role: newUser.role })

      const updatedUser = await User.findByIdAndUpdate(
         newUser._id,
         { refreshToken },
         { new: true }
      ).select('-password');

      res.cookie('refreshToken', newUser.refreshToken, {
         httpOnly: true,
         secure: false, // TODO: Use true in production with HTTPS
         sameSite: 'strict',
         path: '/auth/',
         maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
         success: true,
         data: {
            object: {
               username: newUser.username,
               email: newUser.email,
               phone: newUser.phone,
               accessToken: accessToken,
               role: newUser.role
            },
            message: 'Login successful'
         },
         error: null
      });


   } catch (error) {
      next(error)
   }
}

exports.ContinueWithGoogle = async (req, res, next) => {

   try {
      const { token, phone } = req.body;

      const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      const googleUser = await googleRes.json();
      console.log("googleUser: ", googleUser)
      const { email, given_name, picture } = googleUser;
      let existingUser = await User.findOne({ email });
      if (!existingUser) {
         console.log("creating new user...")
         existingUser = await User.create({
            username: given_name,
            email,
            phone: phone,
            enabled: true,
            role: "User"
         });
      }
      const accessToken = generateAccessToken({ id: existingUser._id, role: existingUser.role })
      const refreshToken = generateRefreshToken({ id: existingUser._id, role: existingUser.role })
      const updatedUser = await User.findByIdAndUpdate(
         existingUser._id,
         { refreshToken },
         { new: true }
      ).select('-password');

      console.log(updatedUser?.refreshToken)

      res.cookie('refreshToken', updatedUser.refreshToken, {
         httpOnly: true,
         secure: false, // TODO: Use true in production with HTTPS
         sameSite: 'strict',
         path: '/auth/',
         maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
         success: true,
         data: {
            object: {
               username: existingUser.username,
               email: existingUser.email,
               phone: existingUser.phone,
               accessToken: accessToken,
               role: existingUser.role
            },
            message: 'Login successful'
         },
         error: null
      });
      return;
   } catch (error) {
      next(error)
   }

}

exports.Login = async (req, res, next) => {
   try {
      console.log("Mongoose readyState:", require('mongoose').connection.readyState); // this is logging nothing
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
         res.status(404).json({
            success: false,
            error: {
               message: "Incorrect email or password."
            },
            data: null
         });
         return;
      }
      if (bcrypt.compareSync(password, user.password)) {
         if (!user.enabled) {
            res.status(401).json({
               success: false,
               error: {
                  message: 'Your account is not verified!',
                  object: {
                     username: user.username,
                     email: user.email,
                  }
               },
               data: null
            });
            return;
         }
         const accessToken = generateAccessToken({ id: user._id, role: user.role })
         const refreshToken = generateRefreshToken({ id: user._id, role: user.role })
         const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { refreshToken },
            { new: true }
         ).select('-password');

         console.log(updatedUser?.refreshToken)

         res.cookie('refreshToken', updatedUser.refreshToken, {
            httpOnly: true,
            secure: false, // TODO: Use true in production with HTTPS
            sameSite: 'strict',
            path: '/auth/',
            maxAge: 30 * 24 * 60 * 60 * 1000
         });

         res.status(200).json({
            success: true,
            data: {
               object: {
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  accessToken: accessToken,
                  role: user.role
               },
               message: 'Login successful'
            },
            error: null
         });
         return;
      }
      res.status(401).json({
         success: false,
         error: {
            message: 'Incorrect email or password.',
         },
         data: null
      })
   } catch (error) {
      next(error)
   }
}

exports.RefreshToken = async (req, res, next) => {
   try {
      const token = req.cookies?.refreshToken;
      console.log("req.cookies: ", req.cookies)
      if (!token) {
         console.log("Refresh token not found in cookie!")
         res.sendStatus(401);
         return;
      };
      const storedToken = await User.findOne({ refreshToken: token });
      if (!storedToken) {
         console.log("Refresh token not found in db!")
         res.sendStatus(401);
         return;
      }

      jwt.verify(token, REFRESH_TOKEN_SECRET, async (err, user) => {
         if (err) {
            console.log("Refresh token expired!")
            return res.sendStatus(401)
         };
         console.log("Refresh token valid. user id: ", user.id)
         const storedUser = await User.findOne({ _id: user.id });
         if (!storedUser || !storedUser.enabled) {
            return res.status(401).send("no user found or disbaled")
         }
         console.log("stored user: ", storedUser)
         const newAccessToken = generateAccessToken({ id: storedUser._id, role: user.role });
         res.status(200).json({
            success: true,
            data: {
               object: {
                  username: storedUser.username,
                  email: storedUser.email,
                  phone: storedUser.phone,
                  accessToken: newAccessToken,
                  role: storedUser.role
               },
               message: 'Refresh successful'
            },
            error: null
         });
         return;
      });
   } catch (error) {
      next(error)
   }
}

exports.Logout = async (req, res, next) => {
   try {
      const refreshToken = req.cookies?.refreshToken;
      const user = await User.findOne(
         { refreshToken },
         { new: true }
      ).select('-password');
      if (user) {
         const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { refreshToken: null },
            { new: true }
         ).select('-password');
         console.log("updated logout user: ", updatedUser)
      }
      res.clearCookie('refreshToken');
      res.sendStatus(204);
   } catch (error) {
      next(error)
   }
}