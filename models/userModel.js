import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ["hr", "hire"], default: "hire" },
  password: String,
});

const User = mongoose.model("User", userSchema);
export default User;
