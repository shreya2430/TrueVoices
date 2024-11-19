import * as userService from '../services/user-authentication-service.js'; 
import { setSuccess, setError } from '../response-handler.js';


//Registering a new user
//user the function from user-authentication-service.js to register a new user
//responds with success or error message based on the operation
export const registerUser = async (req, res) => {
    try {
        const user = await userService.authenticateUser(req.body);
        setSuccess(user, res, 'User registered successfully');
    } catch (error) {
        setError(error.message, res, 400);
    }
};

//Login a user
// uses function froom the serivce file to log in a user by verifying the email and password 
//Returns a session token and user details if successful
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginResponse = await userService.loginUser(email, password);
        setSuccess(loginResponse, res, 'Login Successful');
    } catch (error) {
        setError(error.message, res, 401); //Unauthorized for incorrect login attempt
    }
};

//Update user profile 
//uses the function from the service file to update the suer's profile by it's userid
//validates fields like username, email and password during the updates 
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedProfile = await userService.updateProfile(userId, req.body);
        setSuccess(updatedProfile, res, 'Profile updated Successfully');
    } catch (error) {
        setError(error.message, res, 400); // Bad request 
    }
}; 