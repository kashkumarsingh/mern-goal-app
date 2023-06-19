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

    if (newUser) {
      res.status(201).json({
        userId: newUser._id,
        message: "User registered successfully",
      });
    } else {
      res.status(401).json({
        error: "Invalid user data",
      });
    }
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
    // Extract login form data from request body
    const { email, password } = req.body;
    // Check if the email already exists in the database
    const user = await userModel.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      // Password matched, generate and set the token as a secure HTTP-only cookie
      generateToken(res, user._id);

      res.status(200).json({
        userId: user._id,
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({
        error: "Invalid or incorrect email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to login a user. Please try again later.",
    });
  }
};

//@desc User logout
//@route POST /api/users/logout
//@access Public
const userLogout = async (req, res) => {
  try {
    // Clear the authentication token (e.g., delete from cookies, clear session, etc.)
    res.clearCookie("token"); //Clear the "token" cookie
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to logout. Please try again later.",
    });
  }
};

//@desc Get user rofile
//@route GET /api/users/profile
//@access Private
const getUserProfile = async (req, res) => {
  try {
    // Access the user ID from req.user
    const userId = req.user._id;
    // Perform actions with the user ID, such as fetching the user's profile
    const userProfile = await userModel.findById(userId).select("-password");
    // Check if the user profile exists
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Return the user profile
    res.status(200).json({ profile: userProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//@desc Update user rofile
//@route PUT /api/users/profile/:id
//@access Private
const updateUserProfile = async (req, res) => {
  try {
    // Access the user ID from req.user
    const userId = req.user._id;
    // Extract the updated profile data from the request body
    const { name, email, password } = req.body;
    // Find the user by ID and update the profile data
    const user = await userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Return the updated user profile
    res.status(200).json({ profile: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getUser = async (req, res) => {
  try {
    // Return the updated user profile
    res.status(200).json({ message: "Its me" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  userRegister,
  userLogin,
  getUser,
  userLogout,
  getUserProfile,
  updateUserProfile,
};
