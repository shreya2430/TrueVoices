import User from '../models/user-authentication.js';
import bcrypt from 'bcrypt';

//Checking if a user exists by email
export const doesEmailExist = async(email) => {
    return await User.findOne({email}) ? true : false;
}; 

//Check if a user exists by username
export const doesUsernameExist = async (username) => {
    return await User.findOne({ username }) ? true : false;
};

//creating a new user
export const createUser = async (userDetails) => {
    const user  = new User(userDetails);
    return await user.save();
}

//authenticating a user 
export const authenticateUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return null; // User not found
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        return isMatch ? user : null; // Return user if valid, else null
    } catch (error) {
        console.error("Error in authenticateUser:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

//Find user by email
export const findUserByEmail = async (email) => {
    return await User.findOne({ email});
}

//reset the password
export const updatePassword = async (email, newPassword) => {
    try {
        //Hashing the new password 
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //Find the user and update the password
        const user = await User.findOneAndUpdate(
            { email }, 
            { password: hashedPassword }, 
            { new: true }
        );

        return user;
    } catch(error) {
        console.log('Error updating password: ', error);
        throw error;
    }
};



