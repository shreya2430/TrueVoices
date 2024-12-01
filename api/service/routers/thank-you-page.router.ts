import express, { Request, Response } from 'express';
import { updateThankYouPageForSpace } from '../controllers/thank-you-page-controller';

const router = express.Router();

// Route to update the "Thank You" page for a specific space
router.put('/:spaceId/thank-you-page', async (req: Request, res: Response) => {
    await updateThankYouPageForSpace(req, res);
});

export default router;