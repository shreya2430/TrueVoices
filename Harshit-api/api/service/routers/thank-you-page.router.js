import express from 'express';
import { updateThankYouPageForSpace } from '../controllers/thank-you-page-controller.js'

const router = express.Router();

router.put('/:spaceId/thank-you-page', updateThankYouPageForSpace);

export default router;