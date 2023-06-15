import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

//Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    // Hash the password if it is modified or new
    if (this.isModified("password") || this.isNew) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

//Method to compare the password with the stored password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
