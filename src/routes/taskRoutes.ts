import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  getOneTask,
  deleteTask,
} from "../controllers/taskController";
import { validateTaskId } from "../middleware/validateId";
import { validateTask, validateUpdatedTask } from "../middleware/validateTask";

const router = express.Router();

router.get("/tasks/:id", validateTaskId, getOneTask);
router.get("/tasks", getTasks);
router.post("/tasks", validateTask, createTask);
router.patch("/tasks/:id", validateTaskId, validateUpdatedTask, updateTask);
router.delete("/tasks/:id", validateTaskId, deleteTask);

export default router;
