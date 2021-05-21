import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minLength: 4 },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, minLength: 8 },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

export default mongoose.model("User", userSchema);
