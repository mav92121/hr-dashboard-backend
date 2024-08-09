import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  description: String,
  type: String,
  title: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  response: String,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  contact: Number,
  role: { type: String, enum: ["hr", "hire"], default: "hire" },
  password: String,
  tasks: [taskSchema],
});

const User = mongoose.model("User", userSchema);
export default User;
