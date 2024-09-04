import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    autopopulate: {
      select: "name profilePic city country",
    },
  },

  timesOfPlayed: {
    type: Number,
    default: 0,
  },
  duration: {
    inSeconds: {
      type: Number,
      required: true,
    },
    inMinutes: {
      type: Number,
      required: true,
    },
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
  genre: {
    type: String,
    default: "Unknown",
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

trackSchema.plugin(autopopulate);

export const TrackModel = mongoose.model("tracks", trackSchema);
