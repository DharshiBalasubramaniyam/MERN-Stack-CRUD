const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    enabled: { type: Boolean, default: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    refreshToken: { type: String },
}, {
    timestamps: true
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
