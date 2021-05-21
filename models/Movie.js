import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  seen: { type: Boolean },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Movie", movieSchema);
