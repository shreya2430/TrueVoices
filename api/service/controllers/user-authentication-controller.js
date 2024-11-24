import * as userService from '../services/user-authentication-service.js'; 
import { setSuccess, setError } from '../response-handler.js';

//Registering a new user 
export const registerUser = async(req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        //check if email or username already exists
        if (await userService.doesEmailExist(email)) {
            return res.status(400).json({ message: 'Email is already in use!'});
        }
        if (await userService.doesUsernameExist(username)) {
            return res.status(400).json({ message: 'Username is already taken!'})
        }

        //Creating the user
        const newUser = await userService.createUser({ firstName, lastName, username, email, password });
        return res.status(201).json({ message: "User registered successfully!", user: newUser});
    } catch (error) {
        console.error('Error registering user: ', error);
        return res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Logging in an existing user 
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Authenticate the user
        const user  = await userService.authenticateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password!'});
        }

        //In future, implement JWT token generation here
        return res.status(200).json({ message: "Login Successful!", user});
    } catch (error) {
        console.error("Error logging in user: ", error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
};

//get user details by email

export const getUserByEmail = async (req, res) => {
    try {
        const {email} = req.params;

        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found!'});
        }
        return res.status(200).json({ user})
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
};

//Check if email exists
export const checkEmailExists = async (req, res) => {
    try {
        const { email } = req.body;

        const exists = await userService.doesEmailExist(email);
        return res.status(200).json({ exists});
    } catch (error) {
        console.error("Error checking email: ", error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
};

//Check if username exists
export const checkUsernameExists = async (req, res) => {
    try {
        const { username } = req.body;
        const exists = await userService.doesUsernameExist(username);
        return res.status(200).json({ exists });
    } catch (error) {
        console.error("Error checking username: ", error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
};

export const resetPassword = async (req, res) => {
    try { 
        const { email, nePassword } = req.body;

        //Checking if the user exists
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found!'});
        }

        //Updating the user's password
        const updatedUser = await userService.updatePassword(email, newPassword);
        return res.status(200).json({ message: 'Password reset successfully!', user: updatedUser});
    } catch(error){
        console.error("Error resetting the password: ", error);
        return res.status(500).json({ message: "Internal Server Error!"});
    }
};