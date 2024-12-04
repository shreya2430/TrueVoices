import * as UserManagementService from '../services/user-management-service';
import { Request, Response } from 'express';

//Controller to get user by id 
export const getUserById = async (req: Request,  res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const user = await UserManagementService.getUserById(userId);

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
export const updateUserProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        const updatedUser = await UserManagementService.updateUserProfile(userId, updateData);
        res.status(200).json({ message: "User profile updated successfully!", user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Controller to delete a user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { userId } = req.params;
        const deletedUser = await UserManagementService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found'})
        }
        res.status(200).json({ message: 'User deleted successfully!', user: deletedUser });
    } catch (error) {
        console.error('Error deleting user: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};

//Controller to get all users
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await UserManagementService.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users: ', error);
        res.status(500).json({ message: 'Internal Server Error!'});
    }
};