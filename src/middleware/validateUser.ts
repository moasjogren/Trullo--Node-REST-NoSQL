import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import { User } from "../models/models";

export const validateUser = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 charachters"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .isLength({ min: 6 })
    .withMessage("Email must be at least 6 characters")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new Error("Email already registered");
      }
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

export const validateUpdatedUser = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 charachters"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  // TODO: lägg till email

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array().map((e) => e.msg));
    }
    next();
  },
];
