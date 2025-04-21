require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const toDoRoutes = require("./routes/ToDoRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db");
const { handleErrors } = require('./middlewares/ErrorHandler');
const port = process.env.PORT || 9000
const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);

app.use(express.json())
app.use(cookieParser())
app.use(handleErrors)

connectDB()

app.use("/todo", toDoRoutes);
app.use("/auth", authRoutes);

app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful!" })
})

app.listen(port, () => {
    console.log("Connected to port " + port)
})