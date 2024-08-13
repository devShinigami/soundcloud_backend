import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  isPrivate: {
    required: true,
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const TrackModel = mongoose.model("tracks", trackSchema);
