import express from "express";
import * as userAuthenticationController from "../controllers/user-authentication-controller.js";

const router = express.Router();

//Route to register a new user 
router.post("/register", userAuthenticationController.registerUser);

//Route to login an existing user
router.post("/login", userAuthenticationController.loginUser);

//Route to update the user profile by user id
router.put("/user/:userId", userAuthenticationController.updateUserProfile);

export default router;