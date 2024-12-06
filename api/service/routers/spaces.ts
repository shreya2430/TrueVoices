import express from 'express';
import { spacesController } from '../controllers/spaces.js';

const router = express.Router();

router.route('/:spaceName')
  .get(spacesController.getById)
  .put(spacesController.update)
  .delete(spacesController.deleteSpace)
router.route('/')
  .get(spacesController.get)
  .post(spacesController.post)

export default router;