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

  timesOfPlayed: {
    type: Number,
    default: 0,
  },

  album: {
    type: String,
  },
  trackData: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    default: "Unknown",
    required: true,
  },
  isPrivate: {
    required: true,
    type: Boolean,
  },
  description: {
    type: String,
  },
  trackImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const TrackModel = mongoose.model("tracks", trackSchema);
