import express from "express";
import { getSuggestions } from "../controllers/suggestion_controller.js";

const suggestionRouter = express.Router();

suggestionRouter.get("/:query", getSuggestions);

export default suggestionRouter;
