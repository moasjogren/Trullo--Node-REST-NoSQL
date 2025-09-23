import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { User } from "../models/models";

export const validateTask = [
  body("title")
    .exists()
    .withMessage("Task must have a title")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 200 })
    .withMessage("Description can't be longer than 200 characters"),
  body("tags")
    .isArray({ min: 0, max: 10 })
    .withMessage("Tags must be an array")
    .custom((tags) => tags.every((tag: any) => typeof tag === "string"))
    .withMessage("Every tag must be a string"),
  body("assignedTo").custom(async (userId: string | null) => {
    if (userId == null) {
      return true;
    } else if (userId != null && !mongoose.isValidObjectId(userId)) {
      throw new Error("Invalid ObjectId");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return true;
  }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array().map((e) => e.msg));
    }

    next();
  },
];
