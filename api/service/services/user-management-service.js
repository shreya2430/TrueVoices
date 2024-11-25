import UserManage from '../models/user-management.js';

//getting user by id
export const getUserById = async (userId) => {
    return await UserManage.findById(userId).select('-password');
}

//updating the user profile
export const updateUserProfile = async (userId, updateData) => {
    try {
        const updatedUser = await UserManage.updateUserProfile(userId, updateData);
        return updatedUser;
    } catch (error) {
        console.error('Error updating user profile: ', error);
        throw error;
    }
};

//deleting a user
export const deleteUser = async (userId) => {
    try {
        const deleteUser = await UserManage.findByIdAndDelete(userId);
        return deleteUser;
    } catch (error) {
        console.error('Error deleting user: ', error);
        throw error;
    }
};

//getting all users
export const getAllUsers = async () => {
    return await UserManage.find().select('-password');
};