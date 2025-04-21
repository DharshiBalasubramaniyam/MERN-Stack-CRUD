const express = require("express");
const AuthRouter = express.Router();
const AuthController = require("../controllers/AuthController.js");

AuthRouter.post("/register", AuthController.RegisterWithEmail)
AuthRouter.post("/google", AuthController.ContinueWithGoogle)
AuthRouter.post("/login", AuthController.Login)
AuthRouter.post("/refresh_token", AuthController.RefreshToken)
AuthRouter.post("/logout", AuthController.Logout)

module.exports = AuthRouter;