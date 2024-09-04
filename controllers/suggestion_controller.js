import { asyncHandler } from "../middlewares/error_handler.js";
import { TrackModel } from "../models/track_model.js";

export const getSuggestions = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const tracks = await TrackModel.find({
    title: { $regex: `.*${query}.*`, $options: "i" },
  }).limit(10);

  const trackNames = tracks.map((track) => track.title);
  console.log(trackNames);

  res.status(200).json({
    success: true,
    suggestions: trackNames,
  });
});
