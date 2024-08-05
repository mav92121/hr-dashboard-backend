import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  completionDate: Date,
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
