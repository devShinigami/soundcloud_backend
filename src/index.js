import express from "express";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
