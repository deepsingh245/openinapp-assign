const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    user_id:{
        type:String,
    },
    priority:{
        type:Number,
        default:0
    },
    title: String,
    description: String,
    due_date: Date,
    status: { type: String, enum: ['TODO', 'DONE'], default: 'TODO' },
  
});

const newTask = mongoose.model("tasks", UserSchema);
module.exports = newTask;
