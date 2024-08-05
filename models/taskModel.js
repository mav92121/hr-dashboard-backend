import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  dueDate: Date,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
