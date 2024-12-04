import UserManage, { IUser} from '../models/user-management';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//Secret key for JWT
const secretKey = process.env.JWT_SECRET;

//Token expiration time 
const jwt_expiresIn = process.env.JWT_EXPIRES_IN;

//Generating JWT Token 
export const generateToken = (user: IUser): string => {
    const payload = { id: user._id, email: user.email, username: user.username };
    return jwt.sign(payload, secretKey, { expiresIn: jwt_expiresIn });   
};

//Verify JWT token
export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}

//getting user by id
export const getUserById = async (userId: string): Promise<Omit<IUser, "password"> | null> => {
    return await UserManage.findById(userId).select('-password');
}

//updating the user profile
export const updateUserProfile = async (
    userId: string, 
    updateData: Partial<IUser>
): Promise<IUser> => {
    try {
        const updatedUser = await UserManage.updateUserProfile(userId, updateData);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user profile: ', error);
        throw error;
    }
};

//deleting a user
export const deleteUser = async (userId: string): Promise<IUser | null> => {
    try {
        const deleteUser = await UserManage.findByIdAndDelete(userId);
        return deleteUser;
    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
};

//getting all users
export const getAllUsers = async (): Promise<Omit<IUser, "password">[]> => {
    return await UserManage.find().select('-password');
};