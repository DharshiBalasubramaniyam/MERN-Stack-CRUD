const express = require("express");
const toDoRouter = express.Router();
const toDoController = require("../controllers/ToDoController");
const { authenticate } = require("../middlewares/Authentication")

toDoRouter.post("/new", authenticate, toDoController.createToDo)
toDoRouter.get("/summary", authenticate, toDoController.getToDoSummary)
toDoRouter.get("/:id", authenticate, toDoController.getToDoById)
toDoRouter.put("/:id", authenticate, toDoController.editToDo)
toDoRouter.delete("/:id", authenticate, toDoController.deleteToDo)

module.exports = toDoRouter;