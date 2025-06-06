import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    maxLength: 30,
    minLenght: 4,
  },
  city: {
    type: String,
    maxLength: 30,
    minLenght: 4,
  },
  country: {
    type: String,
    maxLength: 30,
    minLenght: 4,
  },
  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter a name"],
    minLenght: [8, "password must be at least * 8 characters long"],
    select: false,
  },
  profilePic: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      default:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      type: String,
      required: true,
    },
  },
  bannerPic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.y1Q09f7NYYvYaZcOWWExygHaEK?rs=1&pid=ImgDetMain",
    },
  },
  bio: {
    type: String,
    maxLength: 100,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  tracks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tracks",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tracks",
    },
  ],
  playlists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tracks",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export const UserModel = mongoose.model("users", userSchema);
