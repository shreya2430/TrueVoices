import express, { Router } from "express";
import * as userController from "../controllers/user-authentication-controller";
import { authenticateToken } from "../middlewares/jwt-middleware";
const userService = require('../services/user-authentication-service');

const router: Router = express.Router();

//Route to register a new user 
router.post("/register", userController.registerUser);

//Route to login an existing user
router.post("/login", userController.loginUser);

//Check if an email exists
router.post('/check-email', userController.checkEmailExists);

//Checking if a username exists
router.post('/check-username', userController.checkUsernameExists);

// Reset Password
router.post('/reset-password', authenticateToken, userController.resetPassword);


export default router;