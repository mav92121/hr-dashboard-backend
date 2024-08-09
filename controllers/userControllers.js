import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { name, email, contact, password, role, date, tasks } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    contact,
    password: hashedPassword,
    date,
    role,
    tasks,
  });
  await user.save();
  res.status(201).send("User registered");
};

let userLogged;
export const userlogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }
  userLogged = user;
  const token = jwt.sign({ userId: user._id, role: user.role }, "secret");
  res.status(200).json({ token });
};

export const userLoginSuccess = async (req, res) => {
  // Extract the token from headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "secret"); // Use your actual secret key
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user information
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const getAllHires = async (req, res) => {
  try {
    const hires = await User.find({ role: "hire" });
    const hiresWithTaskCount = await Promise.all(
      hires.map(async (hire) => {
        const taskCount = await Task.countDocuments({ assignedTo: hire._id });
        const completedTaskCount = await Task.countDocuments({
          assignedTo: hire._id,
          status: "completed",
        });
        return {
          ...hire.toObject(),
          taskCount,
          completedTaskCount,
        };
      })
    );

    return res.status(200).json(hiresWithTaskCount);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, contact, email, date, tasks } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        contact,
        email,
        date,
        tasks,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { userId, taskId, response } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.response = response;
    task.status = "completed";
    await user.save();
    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
