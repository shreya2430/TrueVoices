import User, {IUser} from '../models/user-authentication';
import bcrypt from 'bcrypt';

/**
 * Check if a user exists by email.
 * @param email - User's email address
 * @returns Promise<boolean> - True if user exists, otherwise false.
 */

export const doesEmailExist = async (email: string): Promise<boolean> => {
    const user = await User.findOne({ email });
    return user ? true : false;
};

/**
 * Check if a user exists by username.
 * @param username - User's username
 * @returns Promise<boolean> - True if user exists, otherwise false.
 */

export const doesUsernameExist = async (username: string): Promise<boolean> => {
    const user = await User.findOne({ username});
    return user ? true: false;
};

/**
 * Define the structure of user details for creating a new user
 */

interface UserDetails {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

/**
 * Create a new user
 * @param userDetails - object containing user details 
 * @returns Promise<IUser> - The created user object
 */

export const createUser = async (userDetails: UserDetails): Promise<IUser> => { 
    const user = new User(userDetails);
    return await user.save();
};

/**
 * Authenticate a user by email and password.
 * @param email - User's email address.
 * @param password - User's plain text password.
 * @returns Promise<IUser | null> - The authenticated user object, or null if authentication fails.
 */

export const authenticateUser = async (email: string, password: string): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return null;
        }
        const isMatch = await user.comparePassword(password);
        return isMatch ? user : null;
    } catch (error) {
        console.error("Error in authenticateUser:", error);
        throw error;
    }
};

/**
 * Find a user by email.
 * @param email - User's email address.
 * @returns Promise<IUser | null> - The user object if found, or null if not.
 */
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
};

/**
 * Update a user's password.
 * @param email - User's email address.
 * @param newPassword - The new plain text password.
 * @returns Promise<IUser | null> - The updated user object, or null if the update fails.
 */
export const updatePassword = async (email: string, newPassword: string): Promise<IUser | null> => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true } // Return the updated document
        );
        return user;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};



