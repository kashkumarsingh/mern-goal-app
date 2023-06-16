import express from "express";
import {getUser, userLogin, userLogout, userRegister } from "../controllers/userController.js";
const router = express.Router();

//User register route
router.post("/", userRegister);

//User login route
router.post("/login", userLogin);

//User logout route
router.post("/logout", userLogout);

//User data route
router.get("/me", getUser);

// User profile route
// router.route("/profile").get().put();

export { router as userRouter };
