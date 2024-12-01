import express, { Request, Response } from 'express';
import { getExtraSettings, updateExtraSettings } from '../controllers/extra-settings-controller';

const router = express.Router();

router.get('/:spaceId/extra-settings', async (req: Request, res: Response) => {
    await getExtraSettings(req, res);
});

router.put('/:spaceId/extra-settings', async (req: Request, res: Response) => {
    await updateExtraSettings(req, res);
});

export default router;