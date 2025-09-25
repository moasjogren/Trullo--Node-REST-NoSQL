import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/models";

export async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(`Could not get users. Error: ${error}`);
  }
}

export async function getOneUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Could not get user. Error: ${error}`);
  }
}

export async function createUser(req: Request, res: Response) {
  let { name, email, password } = req.body;
  try {
    password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Could not create user. Error: ${error}`);
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { name, password, email, role } = req.body;
  const input: any = { name, password, email, role };

  try {
    if (password) input.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(`Could not update user. Error: ${error}`);
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json(`User with id ${deletedUser?._id} deleted`);
  } catch (error) {
    res.status(500).json(`Could not delete user. Error: ${error}`);
  }
}
