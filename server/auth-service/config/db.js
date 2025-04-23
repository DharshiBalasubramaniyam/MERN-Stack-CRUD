require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected (auth-service)');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error)
    }
}

module.exports = connectDB;