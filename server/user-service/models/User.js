const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    categories: { type: [String] }
}, {
    timestamps: true
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
