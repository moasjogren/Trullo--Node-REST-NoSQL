import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { User } from "../models/models";

export async function checkUserId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json("Invalid id format");
  }

  const isUser = await User.findById(id);
  if (!isUser) {
    return res.status(404).json("User not found");
  }
  next();
}
