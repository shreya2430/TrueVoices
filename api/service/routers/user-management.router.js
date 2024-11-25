import express from 'express';
import * as UserManagementController from '../controllers/user-management-controller.js';

const router = express.Router();

router.get('/users/:userId', UserManagementController.getUserById);
router.put('/users/:userId', UserManagementController.updateUserProfile);
router.delete('/users/:userId', UserManagementController.deleteUser);
router.get('/users', UserManagementController.getAllUsers);

export default router;
