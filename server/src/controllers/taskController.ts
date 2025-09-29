import { Request, Response } from "express";

import { Task } from "../models/models";

export async function getTasks(_req: Request, res: Response) {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(`Could not get tasks. Error: ${error}`);
  }
}

export async function getOneTask(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(`Could not get task. Error: ${error}`);
  }
}

export async function createTask(req: Request, res: Response) {
  const { title, description, status, assignedTo, tags } = req.body;
  const input = { title, description, status, assignedTo, tags };

  try {
    const task = await Task.create(input);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(`Could not create task. Error: ${error}`);
  }
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, status, assignedTo, tags } = req.body;
  const input: any = { title, description, status, assignedTo, tags };

  try {
    if (status === "DONE") {
      input.finishedAt = Date.now();
    }
    const updatedTask = await Task.findByIdAndUpdate(id, input, { new: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json(`Could not update task. Error: ${error}`);
  }
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json(`Could not delete task. Error: ${error}`);
  }
}
