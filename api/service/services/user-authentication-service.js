import User from '../models/user-authentication.js';

///helper function to simulate password check 
const isPasswordMatch = (plainPassword, storedPassword) => {
    return plainPassword === storedPassword; //simple plain text comparison
};

//Function to authenticate the user
export const authenticateUser = async (userData) => {
    try {
        //validating passwords match
        if (userData.password !== userData.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        //Creating the user in the database
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });
        //Saving the user to the database
        await newUser.save(); 

        return {
            userId: newUser._id,
            username: newUser.username,
            message: 'Userregistered successfully', 
        };
    }catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('Validation failed: ' + error.message);
        }
        throw new Error(error.message || 'An error occurred while registering the user');
    }
};

//Function to login an existing user
export const loginUser = async (email, password) => {
    try {
        //Find the user by email
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('Incorrect email or password');
        }
        //compare the password provided with the stored password
        const isMatch = isPasswordMatch(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect email or password');
        }

        const sessionToken = `session_${user._id}`;

        return {
            message: 'Login successful', 
            userId: user._id,
            sessionToken: sessionToken,
        };
    } catch (error) {
        throw new Error(error.message || 'An error occurred while logging in');
    }
};

//Function to update the user's profile
export const updateProfile = async (userId, updateData) => {
    try {
        //Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        //update username and email if provided 
        if (updateData.username){
            user.username = updateData.username;
        }
        if (updateData.email){
            //if email is updated, then checking if it is unique or not 
            const existingEmail = await User.findOne({ email: updateDaya.email });
            if (exisitingEmail && exisitingEmail._id.toString() !== userId){
                throw new Error('Email already exists');
            } 
            user.email = updateData.email;
        }

        //handling the password update
        if (upddateData.currentPassword && updateData.newPassword) {
            if (!isPasswordMatch(updateData.currentPassword, user.password)){
                throw new Error('Incorrect password');
            }
            //Updating the password with new passeord 
            user.password = updateData.newPassword;
        }
        //saving the updated user to the database
        await user.save();

        return {
            message: 'Profile Updated Successfully!', 
            user: { userId: user._id, username: user.username, email: user.email },
        };
    } catch (error) {
        throw new Error(error.message || 'An error occurred while updating the profile');
    }
};

//THings done here:
//1. Registering the user:
// - user provides username, email, password, and confirmPassword. The serivce will check if passwords match and then stores the password in the database 
//2. Logging in the user
// - user provides email and password. The service will find the user by email and compare the password provided with the stored password
//3. Updating the user's profile
// - user can update their username, email, and password. The service will find the user by userId and update the user's profile based on the provided data
