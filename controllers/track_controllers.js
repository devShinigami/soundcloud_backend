import { TrackModel } from "../models/track_model.js";
import { asyncHandler } from "../middlewares/error_handler.js";
import { UserModel } from "../models/user_model.js";
import cloudinary from "cloudinary";

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

export const uploadTrack = asyncHandler(async (req, res) => {
  const filePath = req.file.path;
  const {
    title,
    genre,
    trackData,
    duration,
    isPrivate,
    trackImageFromGallery,
  } = req.body.track;
  const result = await cloudinary.v2.uploader.upload(filePath, {
    resource_type: "video",
    folder: "tracks",
  });
  const { userId } = req.body;
  const trackImage = {
    public_id: "",
    url: "",
  };
  trackData.publicId = result.public_id;
  trackData.url = result.secure_url;

  const user = await UserModel.findById(userId);

  if (trackImageFromGallery) {
    const image = await cloudinary.v2.uploader.upload(trackImageFromGallery, {
      folder: "track_images",
      transformation: [
        {
          width: 500,
          crop: "fill",
        },
      ],
    });

    trackImage = {
      public_id: image.public_id,
      url: image.url,
    };
    console.log(trackImage.url);
  } else {
    trackImage = {
      public_id: user.profilePic.public_id,
      url: user.profilePic.url,
    };
  }

  const track = await TrackModel.create({
    user: user._id,
    title,
    genre,
    duration,
    isPrivate,
    trackData: {
      public_id: trackData.publicId,
      url: trackData.url,
    },
  });
  user.tracks.push(track._id);
  await track.save();
  await user.save();
  res.status(201).json({
    message: "Track uploaded successfully",
  });
});
