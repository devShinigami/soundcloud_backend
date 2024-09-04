import { asyncHandler } from "../middlewares/error_handler.js";
import { UserModel } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

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
  };
  const bannerPic = {
    public_id: "hashir",
  };

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    profilePic,
    bannerPic,
    bio: "kuch bhi",
  });

  if (newUser) {
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    await newUser.save();

    res.status(201).json({
      email: newUser.email,
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
  const user = await UserModel.findOne({ email })
    .select("+password")
    .populate("tracks");

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
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  res.status(200).json({
    message: "Login Successfully!",
    user: userWithoutPassword,
    token,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userFromClient, id } = req.body;

  if (!id) {
    res.status(400);
    res.json({
      message: "user is not found",
    });
    throw new Error("user is not found");
  }
  if (
    userFromClient.isDeletedProfilePic &&
    userFromClient.profilePic.public_id
  ) {
    const res = await cloudinary.v2.uploader.destroy(
      userFromClient.profilePic.public_id
    );
  }
  if (userFromClient.isDeletedBannerPic && userFromClient.bannerPic.public_id) {
    const res = await cloudinary.v2.uploader.destroy(
      userFromClient.bannerPic.public_id
    );
  }
  if (userFromClient.imageFromGallery) {
    const result = await cloudinary.v2.uploader.upload(
      userFromClient.imageFromGallery,
      {
        folder: "profile_pics",
        width: 100,
      }
    );
    userFromClient.profilePic = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  if (userFromClient.bannerImageFromGallery) {
    const result = await cloudinary.v2.uploader.upload(
      userFromClient.bannerImageFromGallery,
      {
        folder: "banner_pics",
      }
    );
    userFromClient.bannerPic = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  const user = await UserModel.findByIdAndUpdate(id, userFromClient, {
    new: true,
    runValidators: true,
  });
  await user.save();
  if (user) {
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } else {
    res.status(400);
    res.json({
      message: "Invalid user data",
    });
    throw new Error("Invalid user data");
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await UserModel.findById(id).populate("tracks");
  console.log(user);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    user,
  });
});
