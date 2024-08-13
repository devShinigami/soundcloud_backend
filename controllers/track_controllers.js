import { TrackModel } from "../models/track_model.js";

export const getTrack = async (req, res) => {
  const { id } = req.params;
  const track = await TrackModel.findById(id);
  if (!track) {
    res.status(404).json({
      message: "Track not found",
    });
  }
  res.status(200).json({
    track,
  });
};
