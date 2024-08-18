import express from "express";
import { createUser, loginUser } from "../controllers/user_controllers.js";
import { isAuthenticated } from "../utils/jwt.js";

const userRouter = express.Router();

userRouter.post("/auth/create", createUser);
userRouter.post("/auth/login", loginUser);
userRouter.get("/authenticate", isAuthenticated);
export default userRouter;
