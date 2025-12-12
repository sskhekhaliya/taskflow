import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

// CREATE new task
router.post("/", auth, async (req, res) => {
  const { title } = req.body;

  const task = new Task({
    title,
    userId: req.user.userId,
  });

  await task.save();
  res.json(task);
});

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  const { completed } = req.body;

  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { completed },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Task not found" });

  res.json(updated);
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId,
  });

  if (!deleted) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Task deleted" });
});

export default router;
