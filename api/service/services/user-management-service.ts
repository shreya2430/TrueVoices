import { UserModel } from '../models';
import { IUser } from '../models/user-authentication';

//getting user by id
export const getUserById = async (userId: string): Promise<Omit<IUser, "password"> | null> => {
    return await UserModel.findById(userId).select('-password');
}

//updating the user profile
export const updateUserProfile = async (
    userId: string, 
    updateData: Partial<IUser>
): Promise<IUser> => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        return updatedUser;
    } catch (error) {
        console.error('Error updating user profile: ', error);
        throw error;
    }
};

//deleting a user
export const deleteUser = async (userId: string): Promise<IUser | null> => {
    try {
        const deleteUser = await UserModel.findById(userId);
        return deleteUser;
    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
};

//getting all users
export const getAllUsers = async (): Promise<Omit<IUser, "password">[]> => {
    return await UserModel.find().select('-password');
};