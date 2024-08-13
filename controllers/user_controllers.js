import { asyncHandler } from "../middlewares/error_handler.js";
import { UserModel } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(400);
    res.json({
      message: "User already exists",
    });
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const profilePic = {
    public_id: "hashir",
    url: "hashir",
  };

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    profilePic,
  });

  if (newUser) {
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: token,
    });
  } else {
    res.status(400);
    res.json({
      message: "Invalid user data",
    });
    throw new Error("Invalid user data");
  }
});
