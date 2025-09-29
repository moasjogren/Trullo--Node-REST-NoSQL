import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/models";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Missing credentials");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json("Invalid password");
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json("Access denied");
    }

    next();
  } catch (error) {
    return res.status(500).json(`Internal server error: ${error}`);
  }
}
