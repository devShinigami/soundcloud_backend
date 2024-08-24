import mongoose from "mongoose";

const comment = new mongoose.model({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tracks",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    maxLength: 200,
  },
  commentedDuration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    default: [],
  },
});

const CommentModel = mongoose.model("comments", comment);
