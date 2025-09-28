import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { User } from "../models/models";

type TaskRules = {
  title: ValidationChain;
  description: ValidationChain;
  status: ValidationChain;
  tags: ValidationChain;
  assignedTo: ValidationChain;
};

export const taskRules: TaskRules = {
  title: body("title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  description: body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 200 })
    .withMessage("Description can't be longer than 200 characters"),
  status: body("status")
    .isIn(["TO_DO", "IN_PROGRESS", "BLOCKED", "DONE"])
    .withMessage("Status must be TO_DO, IN_PROGRESS, BLOCKED or DONE"),
  tags: body("tags")
    .isArray({ min: 0, max: 10 })
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag: any) => typeof tag === "string"))
    .withMessage("Every tag must be a string"),
  assignedTo: body("assignedTo").custom(async (userId: string | null) => {
    if (userId == null) {
      return true;
    } else if (userId != null && !mongoose.isValidObjectId(userId)) {
      throw new Error("Invalid ObjectId");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return true;
  }),
};

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((e) => e.msg));
  }
  next();
};

export const validateTask = [
  taskRules.title,
  taskRules.description,
  taskRules.status,
  taskRules.tags,
  taskRules.assignedTo,
  handleErrors,
];

export const validateUpdatedTask = [
  taskRules.title.optional(),
  taskRules.description.optional(),
  taskRules.status.optional(),
  taskRules.tags.optional(),
  taskRules.assignedTo.optional(),
  handleErrors,
];
