import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import moment from "moment";

const createTask = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const { projectName, typeOfWork, description, taskDate, links, timeTaken } =
      req.body;

    const newTask = await Task.create({
      projectName,
      typeOfWork,
      description,
      taskDate,
      links,
      timeTaken,
      user: userId,
    });

    await User.findByIdAndUpdate(userId, { $push: { tasks: newTask._id } });

    res.status(201).json({
      status: true,
      task: newTask,
      message: "Task created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
});

const getTasks = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const { search = "" } = req.query;
    const query = {
      user: userId,
    };

    // If search is provided, add projectName regex
    if (search.trim()) {
      query.projectName = { $regex: search, $options: "i" }; // case-insensitive
    }

    const tasks = await Task.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({ status: true, tasks });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

const getTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res
        .status(404)
        .json({ status: false, message: "Task not found." });
    }

    res.status(200).json({ status: true, task });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

const getWeeklyTaskSummary = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;

    // Get start of current week
    const endDate = moment().endOf("week");
    // Get start of week 3 weeks ago
    const startDate = moment().subtract(3, "weeks").startOf("week");

    // Fetch tasks in the last 4 weeks
    const tasks = await Task.find({
      user: userId,
      taskDate: { $gte: startDate.toDate(), $lte: endDate.toDate() },
    });

    // Group tasks by week
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = moment().subtract(i, "weeks").startOf("week");
      const weekEnd = moment().subtract(i, "weeks").endOf("week");

      // Filter tasks for this week
      const weekTasks = tasks.filter((task) =>
        moment(task.taskDate).isBetween(weekStart, weekEnd, null, "[]")
      );

      // Sum hours for this week
      const totalHours = weekTasks.reduce(
        (sum, t) => sum + (t.timeTaken || 0),
        0
      );

      // Determine status
      let status = "missing";
      if (totalHours >= 40) status = "completed";
      else if (totalHours > 0 && totalHours < 40) status = "incomplete";

      weeks.unshift({
        weekStart: weekStart.format("YYYY-MM-DD"),
        weekEnd: weekEnd.format("YYYY-MM-DD"),
        totalHours,
        status,
        tasks: weekTasks,
      });
    }

    res.status(200).json({
      status: true,
      weeks,
      message: "Weekly summary fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

const getTasksByDateRange = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const { start, end } = req.query;

    if (!start || !end) {
      return res
        .status(400)
        .json({ status: false, message: "Start and end dates are required." });
    }

    // Fetch tasks in the given date range
    const tasks = await Task.find({
      user: userId,
      taskDate: { $gte: new Date(start), $lte: new Date(end) },
    }).sort({ taskDate: 1 });

    // Group tasks by date
    const dateMap = {};
    tasks.forEach((task) => {
      const dateStr = moment(task.taskDate).format("YYYY-MM-DD");
      if (!dateMap[dateStr]) dateMap[dateStr] = [];
      dateMap[dateStr].push(task);
    });

    // Convert to array of { date, tasks }
    const dateWiseTasks = Object.entries(dateMap)?.map(([date, tasks]) => ({
      date,
      tasks,
    }));

    res.status(200).json({
      status: true,
      dateWiseTasks,
      message: "Tasks fetched by date range successfully.",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const { projectName, typeOfWork, description, taskDate, links, timeTaken } =
      req.body;
    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res
        .status(404)
        .json({ status: false, message: "Task not found." });
    }

    task.projectName = projectName || task.projectName;
    task.typeOfWork = typeOfWork || task.typeOfWork;
    task.description = description || task.description;
    task.taskDate = taskDate || task.taskDate;
    task.links = links || task.links;
    task.timeTaken = timeTaken || task.timeTaken;

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Task updated successfully.", task });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const task = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!task) {
      return res
        .status(404)
        .json({ status: false, message: "Task not found." });
    }

    res
      .status(200)
      .json({ status: true, message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

export {
  createTask,
  getTask,
  getTasks,
  getWeeklyTaskSummary,
  updateTask,
  deleteTask,
  getTasksByDateRange,
};
