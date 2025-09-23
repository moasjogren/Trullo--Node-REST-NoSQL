import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  getOneTask,
} from "../controllers/taskController";
import { validateTaskId } from "../middleware/validateId";
import { validateTask } from "../middleware/validateTask";

const router = express.Router();

router.get("/tasks/:id", validateTaskId, getOneTask);
router.get("/tasks", getTasks);
router.post("/tasks", validateTask, createTask);
router.put("/tasks/:id", validateTaskId, validateTask, updateTask);

export default router;
