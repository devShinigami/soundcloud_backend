import express from "express";
import { getTrack } from "../controllers/track_controllers.js";

export const trackRouter = express.Router();

trackRouter.get("/singleTrack/:id", getTrack);
