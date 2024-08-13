import express from "express";
import { createUser } from "../controllers/user_controllers.js";

const userRouter = express.Router();

userRouter.post("/auth/create", createUser);

export default userRouter;
