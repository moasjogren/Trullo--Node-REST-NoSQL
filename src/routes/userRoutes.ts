import express from "express";

import {
  getOneUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { validateId } from "../middleware/validateId";
import { validateUser, validateUpdatedUser } from "../middleware/validateUser";

const router = express.Router();

router.get("/users/:id", validateId, getOneUser);
router.get("/users", getUsers);
router.post("/users", validateUser, createUser);
router.put("/users/:id", validateId, validateUpdatedUser, updateUser);
router.delete("/users/:id", validateId, deleteUser);

export default router;
