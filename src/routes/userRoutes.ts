import express from "express";

import { checkUserId } from "../middleware/checkId";
import { getOneUser, getUsers, createUser } from "../controllers/userController";

const router = express.Router();

router.get("/users/:id", checkUserId, getOneUser);
router.get("/users", getUsers);
router.post("/users", createUser);

export default router;
