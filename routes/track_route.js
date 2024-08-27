import express from "express";
import { getTrack, uploadTrack } from "../controllers/track_controllers.js";
import multer from "multer";
import path from "path";

export const trackRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

trackRouter.get("/singleTrack/:id", getTrack);
trackRouter.post("/upload", upload.single("audio"), uploadTrack);
