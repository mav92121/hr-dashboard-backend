import express from "express";
import Task from "../models/taskModel.js";
import Progress from "../models/progressModel.js";

const router = express.Router();

router.post("/tasks", async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  const task = new Task({ title, description, assignedTo, dueDate });
  await task.save();
  res.status(201).send("Task created");
});

router.get("/tasks/:id", async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.params.id });
  res.status(200).json(tasks);
});

router.put("/tasks/:id", async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.id);
  task.status = status;
  await task.save();
  res.status(200).send("Task updated");
});

router.get("/progress/:id", async (req, res) => {
  const progress = await Progress.find({ userId: req.params.id });
  res.status(200).json(progress);
});

export default router;
