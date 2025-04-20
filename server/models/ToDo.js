const mongoose = require("mongoose");

const ToDoSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Home', 'Urgent'],
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    datetime: {
        type: Date,
    }
}, { timestamps: true })

const ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;