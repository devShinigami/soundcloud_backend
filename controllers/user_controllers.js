import { asyncHandler } from "../middlewares/error_handler.js";
import { UserModel } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    res.json({
      message: "All fields are required",
    });
    throw new Error("All fields are required");
  }
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

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.json({
      message: "All fields are required",
    });
    throw new Error("All fields are required");
  }
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    res.status(400);
    res.json({
      message: "User not found",
    });
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    res.json({
      message: "Invalid credentials",
    });
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    message: "Login Successfully!",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});
