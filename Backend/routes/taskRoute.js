import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
} from "../controller/taskController.js";

import authMiddleware from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter
  .route("/gp")
  .get(authMiddleware, getAllTasks) // ✅ changed from getTasks
  .post(authMiddleware, createTask);

taskRouter
  .route("/:id/gp")
  .get(authMiddleware, getTaskById) // ✅ changed from getTasksById
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default taskRouter;
