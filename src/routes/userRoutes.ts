import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUser,
  getUsers,
  updateUserHandler,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:userId", getUser);
router.post("/users", createUserHandler);
router.put("/users/:userId", updateUserHandler);
router.delete("/users/:userId", deleteUserHandler);

export default router;
