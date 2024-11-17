import express from 'express';
import { getExtraSettings, updateExtraSettings } from '../controllers/extra-settings-controller.js';

const router = express.Router();

router.get('/:spaceId/extra-settings', getExtraSettings);
router.put('/:spaceId/extra-settings', updateExtraSettings);

export default router;