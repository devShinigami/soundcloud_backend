import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import { dataConnection } from "../database/database.js";
import userRouter from "../routes/user_route.js";
import { v2 as cloudinary } from "cloudinary";

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
