import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const foundedUser = await User.find({}).populate("movies");
    res.send(foundedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const foundedUser = await User.findOne({ username });

  const correctPassword = foundedUser
    ? await bcrypt.compare(password, foundedUser.passwordHash)
    : false;

  if (!correctPassword) {
    return res.status(401).json({ message: "Wrong username or password" });
  }

  return res.json({
    username: foundedUser.username,
    _id: foundedUser._id,
    movies: foundedUser.movies,
  });
});

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    email,
    passwordHash,
  });

  try {
    // poista muuttuja
    const savedUser = await newUser.save();
    return res.status(201).end();
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error });
    }

    return res.status(500).json({ error });
  }
});

export default userRouter;
