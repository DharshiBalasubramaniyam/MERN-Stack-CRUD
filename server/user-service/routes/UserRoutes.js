const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/UserController");

userRouter.post("/cat", userController.createCategory)
userRouter.put("/cat", userController.editCategory)
userRouter.delete("/cat/:categoryToRemove", userController.deleteCategory)

module.exports = userRouter;