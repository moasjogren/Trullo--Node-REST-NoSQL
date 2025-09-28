import { Request, Response, NextFunction } from "express";
import { User } from "../models/models";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  console.log(user.role);
}
// TODO Skicka med token, inte email
