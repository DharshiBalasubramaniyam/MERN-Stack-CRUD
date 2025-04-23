require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware')
const {authenticate} = require("./middlewares/authentication")

const port = process.env.PORT || 9000

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);

app.use('/auth', createProxyMiddleware({
   target: "http://localhost:9002",
   changeOrigin: true,
   pathRewrite: {'^/auth': ''}
}))

app.use('/todo', authenticate, createProxyMiddleware({
   target: "http://localhost:9001",
   changeOrigin: true,
   pathRewrite: {'^/todo': ''}
}))

app.listen(port, () => {
   console.log("Connected to port " + port)
})