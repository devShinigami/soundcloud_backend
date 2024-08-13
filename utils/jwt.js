import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/errorHandling.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).send({
      message: "logged Out",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid token",
      success: false,
    });
  }
});
