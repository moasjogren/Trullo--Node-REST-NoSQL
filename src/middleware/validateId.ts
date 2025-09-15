import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { param, validationResult } from "express-validator";

import { User } from "../models/models";

export const validateId = [
  param("id").custom(async (id) => {
    if (!mongoose.isValidObjectId(id)) throw new Error("Invalid ObjectId");

    const user = await User.findById(id);
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
