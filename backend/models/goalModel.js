import mongoose from "mongoose";

//Define the goal schema
const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const goalModel = mongoose.model("Goal", goalSchema);

export default goalModel;
