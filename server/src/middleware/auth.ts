import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/variables";
import { UserType } from "../models/models";

export function token(user: UserType) {
  if (!JWT_SECRET) throw new Error("Missing credentials");
  if (!user._id || !mongoose.isValidObjectId(user._id))
    throw new Error("Invalid user id");

  return jwt.sign({ sub: user._id.toString() }, JWT_SECRET, {
    expiresIn: "1h",
  });
}
