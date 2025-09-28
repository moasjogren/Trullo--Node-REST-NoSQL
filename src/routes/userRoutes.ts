import express from "express";
import {
  getOneUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
} from "../controllers/userController";
import { validateUserId } from "../middleware/validateId";
import { validateUser, validateUpdatedUser } from "../middleware/validateUser";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();

router.post("/users/signin", signInUser);

router.get("/users/:id", validateUserId, getOneUser);
router.get("/users", getUsers);
router.post("/users", validateUser, createUser);
router.patch("/users/:id", validateUserId, validateUpdatedUser, updateUser);
router.delete("/users/:id", validateUserId, isAdmin, deleteUser);

export default router;
