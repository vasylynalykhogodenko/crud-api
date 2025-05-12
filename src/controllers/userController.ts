import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../models/userModel";
import { validate as isUuid } from "uuid";

export const getUsers = (req: Request, res: Response): void => {
  res.status(200).json(getAllUsers());
};

export const getUser = (req: Request, res: Response): void => {
  const { userId } = req.params;

  if (!isUuid(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  const user = getUserById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(user);
};

export const createUserHandler = (req: Request, res: Response): void => {
  const { username, age, hobbies } = req.body;

  if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  const newUser = createUser(username, age, hobbies);
  res.status(201).json(newUser);
};

export const updateUserHandler = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!isUuid(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  if (!username || typeof age !== "number" || !Array.isArray(hobbies)) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  const updatedUser = updateUser(userId, username, age, hobbies);
  if (!updatedUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(updatedUser);
};

export const deleteUserHandler = (req: Request, res: Response): void => {
  const { userId } = req.params;

  if (!isUuid(userId)) {
    res.status(400).json({ message: "Invalid userId" });
    return;
  }

  const success = deleteUser(userId);
  if (!success) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(204).send();
};
