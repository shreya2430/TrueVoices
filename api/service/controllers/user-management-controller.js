import * as UserManagementService from '../services/user-management-service.js';

//Controller to get user by id 
export const getUserById = async (req,  res) => {
    try {
        const user = await UserManagementService.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found!'});
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user by id: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Controller to update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await UserManagementService.updateUserProfile(req.params.userId, req.body);
        res.status(200).json({ updatedUser });
    } catch (error) {
        console.error('Error updating user profile: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Controller to delete a user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserManagementService.deleteUser(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found'})
        }
        res.status(200).json({ message: 'User deleted successfully!'});
    } catch (error) {
        console.error('Error deleting user: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Controller to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserManagementService.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
}