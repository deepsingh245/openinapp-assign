const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "tasks" },
  status: { type: Number, enum: [0, 1], default: 0 },
  created_at:{
    type : Date,
    default : Date.now()
  },
  updated_at:{
    type:Date,
    default:null
  },
  deleted_at:{
    type: Date,
   default:null
  }

});

const Subtask = mongoose.model("Subtask", subtaskSchema);
module.exports = Subtask;