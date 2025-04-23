const express = require("express");
const toDoRouter = express.Router();
const toDoController = require("../controllers/ToDoController");

toDoRouter.post("/new", toDoController.createToDo)
toDoRouter.get("/summary", toDoController.getToDoSummary)
toDoRouter.get("/:id", toDoController.getToDoById)
toDoRouter.put("/:id", toDoController.editToDo)
toDoRouter.delete("/:id", toDoController.deleteToDo)

module.exports = toDoRouter;