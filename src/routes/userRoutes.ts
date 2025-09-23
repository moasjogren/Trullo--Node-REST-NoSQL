import express from "express";

import {
  getOneUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

import { validateUserId } from "../middleware/validateId";
import { validateUser, validateUpdatedUser } from "../middleware/validateUser";

const router = express.Router();

router.get("/users/:id", validateUserId, getOneUser);
router.get("/users", getUsers);
router.post("/users", validateUser, createUser);
router.put("/users/:id", validateUserId, validateUpdatedUser, updateUser);
router.delete("/users/:id", validateUserId, deleteUser);

export default router;
