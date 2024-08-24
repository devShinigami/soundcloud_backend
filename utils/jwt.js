import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/error_handler.js";
import { UserModel } from "../models/user_model.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).send({
      message: "You have been logged out!",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const _id = decoded?.id;
    const user = await UserModel.findById({ _id });
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(401).send({
      message: "Invalid token",
      success: false,
    });
  }
});
