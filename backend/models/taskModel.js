const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  assignedAttendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
},{
    timestamps:true
});

module.exports = mongoose.model("task", taskSchema);
