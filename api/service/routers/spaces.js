import express from 'express';
import { spacesController } from '../controllers/spaces.js';

const router = express.Router();

router.get('/:spaceName', spacesController.getById)
router.route('/')
  .get(spacesController.get)
  .post(spacesController.post)

export default router;