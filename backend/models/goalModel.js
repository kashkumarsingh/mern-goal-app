import mongoose from "mongoose";

//Define the goal schema
const goalSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
      trime: true,
    },
  },
  { timestamps: true }
);

const goalModel = mongoose.model("Goal", goalSchema);

export default goalModel;
