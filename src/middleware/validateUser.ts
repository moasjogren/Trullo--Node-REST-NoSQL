import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { User } from "../models/models";

type UserRules = {
  name: ValidationChain;
  password: ValidationChain;
  email: ValidationChain;
  role: ValidationChain;
};

const userRules: UserRules = {
  name: body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 charachters"),
  password: body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  email: body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .isLength({ min: 6 })
    .withMessage("Email must be at least 6 characters")
    .custom(async (email) => {
      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  role: body("role")
    .isIn(["USER", "ADMIN"])
    .withMessage("Role must be USER or ADMIN"),
};

const handleErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().map((e) => e.msg));
  }
  next();
};

export const validateUser = [
  userRules.name,
  userRules.password,
  userRules.email,
  userRules.role,
  handleErrors,
];

export const validateUpdatedUser = [
  userRules.name.optional(),
  userRules.password.optional(),
  userRules.email.optional(),
  userRules.role.optional(),
  handleErrors,
];
