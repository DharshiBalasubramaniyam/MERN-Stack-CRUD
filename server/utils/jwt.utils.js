const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

exports.generateRefreshToken = (user) => {
  const token = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  return token;
};