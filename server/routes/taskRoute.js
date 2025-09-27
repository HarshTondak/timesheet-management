import express from "express";
import {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
  getWeeklyTaskSummary,
  getTasksByDateRange,
} from "../controllers/taskController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.get("/", protectRoute, getTasks);
router.get("/weekly-summary", protectRoute, getWeeklyTaskSummary);
router.get("/task-by-date", protectRoute, getTasksByDateRange);
router.get("/:id", protectRoute, getTask);
router.put("/update/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;
