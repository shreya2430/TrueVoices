import express from "express";
import * as userController from "../controllers/user-authentication-controller.js";

const router = express.Router();

//Route to register a new user 
router.post("/register", userController.registerUser);

//Route to login an existing user
router.post("/login", userController.loginUser);

//Check if an email exists
router.post('/check-email', userController.checkEmailExists);

//Checking if a username exists
router.post('/check-username', userController.checkUsernameExists);

// Reset Password
router.post('/reset-password', userController.resetPassword);


export default router;