import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { token } from "../middleware/auth";
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

// TODO: Skapa token + kolla token vid t.ex getOneUser, updateUser
export async function signInUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const userToken = token(user);
    res.status(200).json({ "Success!": userToken });
  } catch (error) {
    res.status(500).json(`Could not sign in user. Error: ${error}`);
  }
}
