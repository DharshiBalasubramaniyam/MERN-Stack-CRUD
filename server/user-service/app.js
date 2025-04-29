require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { handleErrors } = require('./middlewares/ErrorHandler');
const userRoutes = require("./routes/UserRoutes")
const connectDB = require("./config/db");

const port = process.env.USER_SERVICE_PORT || 9003
const app = express();

app.use(cors());
app.use(express.json())
app.use(handleErrors)
app.use("/", userRoutes);

app.use("/test", (req, res) => {
   return "Auth service running successfully..."
})

connectDB()
   .then(() => {
      app.listen(port, () => {
         console.log("User service running in port " + port)
      })
   })
   .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
   });