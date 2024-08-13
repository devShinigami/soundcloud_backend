import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import { dataConnection } from "../database/database.js";
import userRouter from "../routes/user_route.js";
const app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "10000kb",
    extended: true,
    parameterLimit: 50000,
  })
);
configDotenv();

app.use("/api/v1", userRouter);

dataConnection();
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
