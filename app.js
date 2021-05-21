import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import moviesRouter from "./controllers/movies.js";
import usersRouter from "./controllers/users.js";
import logger from "./logger.js";

const app = express();

const PORT = process.env.PORT || 4000;

const url = `mongodb+srv://dbUser:TämäOnPitkäJaVaikeaSalasana1@cluster0.zrzb5.mongodb.net/mern-todo-app?retryWrites=true&w=majority`;

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

app.use("/", moviesRouter);
app.use("/users", usersRouter);

app.use(express.static("build"));

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
