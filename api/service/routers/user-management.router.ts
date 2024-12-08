import express, { Router } from 'express';
import * as UserManagementController from '../controllers/user-management-controller.js';

const router: Router = express.Router();

router.get('/:userId', UserManagementController.getUserById);
router.put('/:userId', UserManagementController.updateUserProfile);
router.delete('/:userId', UserManagementController.deleteUser);
router.get('/', UserManagementController.getAllUsers);

export default router;
