require('dotenv').config();
const express = require("express");
const cors = require('cors');
const toDoController = require("./controllers/ToDoController");
const { handleErrors } = require('./middlewares/ErrorHandler');
const toDoRoutes = require("./routes/ToDoRoutes")
const connectDB = require("./config/db");

const port = process.env.PORT || 9001
const app = express();

app.use(cors());
app.use(express.json())
app.use(handleErrors)
app.use("/", toDoRoutes);

connectDB()
   .then(() => {
      app.listen(port, () => {
         console.log("Connected to port " + port)
      })
   })
   .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
   });