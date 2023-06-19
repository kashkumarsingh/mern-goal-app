import express from "express";
import {getUser, getUserProfile, updateUserProfile, userLogin, userLogout, userRegister } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

//User register route
router.post("/", userRegister);

//User login route
router.post("/login", userLogin);

//User logout route
router.post("/logout", userLogout);

//Get user profile route
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

//User data route
router.get("/me", protect, getUser);

// User profile route
// router.route("/profile").get().put();

export { router as userRouter };
