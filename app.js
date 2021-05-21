import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import moviesRouter from "./controllers/movies.js";
import usersRouter from "./controllers/users.js";
import logger from "./logger.js";

const app = express();

const PORT = process.env.PORT || 4000;
console.log(PORT);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error", error));

app.use(cors());
app.use(json());
app.use(logger);

app.use("/api", moviesRouter);
app.use("/api/users", usersRouter);

app.use(express.static("build"));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
