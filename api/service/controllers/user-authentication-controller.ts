import * as userService from '../services/user-authentication-service'; 
import { setSuccess, setError } from '../response-handler.js';
import { Request, Response } from 'express'; //Importing types from Express
import jwt from 'jsonwebtoken'; //Importing JWT for token generation
import bycrpt from 'bcrypt'; //Importing bcrypt for password hashing

//Registering a new user 
export const registerUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        //check if email or username already exists
        if (await userService.doesEmailExist(email)) {
            res.status(400).json({ message: 'Email is already in use!'});
            return;
        }
        if (await userService.doesUsernameExist(username)) {
            res.status(400).json({ message: 'Username is already taken!'});
            return;
        }

        //Creating the user
        const newUser = await userService.createUser(req.body);

        //GEnerate JWT token
        const token = userService.generateToken(newUser)

        // res.status(201).json({ message: "User registered successfully!", token, user: newUser });
        
                // Send user details and token to the frontend
        res.status(200).json({
            userId: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            textCredits: newUser.textCredits, 
            videoCredits: newUser.videoCredits,
            token,
        });
    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Logging in an existing user 
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        //Authenticate the user
        const user = await userService.authenticateUser(email, password);
        console.log(user);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password!'});
            return;
        }

        //Generating JWT token
        const token = userService.generateToken(user);
        res.status(200).json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            textCredits: user.textCredits, 
            videoCredits: user.videoCredits,
            token,
        });
        // res.status(200).json({ message: "Login Successful!", token, user});
    } catch (error) {
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Internal Server Error!"});
    }
};

//get user details by email
export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const {email} = req.params;

        const user = await userService.findUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: 'User not found!'});
            return;
        }
        res.status(200).json({ user})
    } catch (error) {
        console.error("Error fetching user by email:", error);
        res.status(500).json({ message: "Internal Server Error!"});
    }
};

//Check if email exists
export const checkEmailExists = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        const exists = await userService.doesEmailExist(email);
        res.status(200).json({ exists});
    } catch (error) {
        console.error("Error checking email: ", error);
        res.status(500).json({ message: "Internal Server Error!"});
    }
};

//Check if username exists
export const checkUsernameExists = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.body;
        const exists = await userService.doesUsernameExist(username);
        res.status(200).json({ exists });
    } catch (error) {
        console.error("Error checking username: ", error);
        res.status(500).json({ message: "Internal Server Error!"});
    }
};

//Reset the password 
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, newPassword } = req.body;

    try {
        const {new:updatedUser, resetToken } = await userService.updatePassword(email, newPassword);
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found!'});
            return;
        }
        res.status(200).json({ message: 'Password updated successfully!', user: updatedUser, resetToken});

    } catch (error) {
        console.error("Error updating password: ", error);
        res.status(500).json({ message: "Internal Server Error!"});
    }
};