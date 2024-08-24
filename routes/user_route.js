import express from "express";
import {
  createUser,
  getProfile,
  loginUser,
  updateUser,
} from "../controllers/user_controllers.js";
import { isAuthenticated } from "../utils/jwt.js";

const userRouter = express.Router();

userRouter.post("/auth/create", createUser);
userRouter.post("/auth/login", loginUser);
userRouter.get("/authenticate", isAuthenticated);
userRouter.put("/update", updateUser);
userRouter.get("/profile/:id", getProfile);

export default userRouter;
