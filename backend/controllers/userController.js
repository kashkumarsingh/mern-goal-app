import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Resister new user
//@route POST /api/users/
//@access Public
const userRegister = async (req, res) => {
  try {
    //Extract register form data from the request body
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Create a new user document/instance
    const newUser = new userModel({
      name,
      email,
      password,
    });

    // Save the user document into the database
    await newUser.save();

    res.status(201).json({
      userId: newUser._id,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to register a user. Please try again later.",
    });
  }
};

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const userLogin = async (req, res) => {
  try {
  } catch (error) {}
};

export { userRegister, userLogin };
