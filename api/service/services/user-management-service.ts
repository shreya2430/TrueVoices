import UserManage, { IUser} from '../models/user-management';

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