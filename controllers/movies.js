import { Router } from "express";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

const moviesRouter = Router();

moviesRouter.get("/", async (request, response) => {
  const { body } = request.body;
  console.log(body);

  const movies = await Movie.find({}).populate("user", { _id: 1, username: 1 });
  console.log(movies);

  if (!movies) {
    return response.status(404).json({ error: "Resources not founded" });
  }

  return response.send(movies);
});

moviesRouter.post("/", async (request, response) => {
  const { body } = request;

  const user = await User.findById(body.user);

  const movieToSave = new Movie({
    title: body.title,
    seen: body.seen,
    user,
  });

  try {
    const savedMovie = await movieToSave.save();
    user.movies = user.movies.concat(savedMovie._id);
    await user.save();
    response.send(savedMovie);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

moviesRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const movie = request.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {
      new: true,
    });
    return response.json(updatedMovie);
  } catch (error) {
    response.status(500).json({ error });
  }
});

moviesRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await Movie.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default moviesRouter;
