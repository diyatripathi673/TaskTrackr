import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === true,
      owner: req.user._id,
    });
    const saved = await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: saved,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

//Get All tasks for logge in user
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      tasks: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Get single task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // If task is found
    res.json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching task",
      error: error.message,
    });
  }
};

// Update task by ID
export const updateTask = async (req, res) => {
  const data = { ...req.body };
  if (data.completed !== undefined) {
    data.completed = data.completed === "Yes" || data.completed === true;
  }
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    data,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.json({
    success: true,
    message: "Task updated successfully",
    task: updated,
  });
};
// Delete task by ID
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message,
    });
  }
};
// Mark task as completed
export const markTaskAsCompleted = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { completed: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking task as completed",
      error: error.message,
    });
  }
};

// Mark task as not completed
export const markTaskAsNotCompleted = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { completed: false },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task marked as not completed",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking task as not completed",
      error: error.message,
    });
  }
};
