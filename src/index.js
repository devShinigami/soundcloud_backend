import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import { dataConnection } from "../database/database.js";
import userRouter from "../routes/user_route.js";
import { v2 as cloudinary } from "cloudinary";
import { trackRouter } from "../routes/track_route.js";
import suggestionRouter from "../routes/suggestion_route.js";

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);
configDotenv();

app.use("/api/v1", userRouter);
app.use("/api/v1/track", trackRouter);
app.use("/api/v1/suggestions", suggestionRouter);

dataConnection();

//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
