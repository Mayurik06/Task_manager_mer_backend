import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "low",
  },
  assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  assignedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  assignDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: [true, "Task due date is required"],
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
