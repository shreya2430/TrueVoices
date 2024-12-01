import { Request, Response } from 'express';
import { getSettings, updateSettings } from '../services/extra-settings-service'; 
import { setSuccess, setError } from '../response-handler'; 

/**
 * Fetch extra settings for a specific space.
 *
 * @param req -  space id
 * @param res -  response object
 */
export async function getExtraSettings(req: Request, res: Response): Promise<void> {
    try {
        const { spaceId } = req.params;
        if (!spaceId) {
            throw new Error('spaceId is required');
        }

        const settings = await getSettings(spaceId);
        setSuccess(settings, res, 'Extra settings fetched successfully');
    } catch (error) {
        setError(error, res);
    }
}

/**
 * Update extra settings for a specific space.
 *
 * @param req -  request object
 * @param res -  response object
 */
export async function updateExtraSettings(req: Request, res: Response): Promise<void> {
    try {
        const { spaceId } = req.params;
        if (!spaceId) {
            throw new Error('spaceId is required');
        }

        const updates = req.body;
        const updatedSettings = await updateSettings(spaceId, updates);
        setSuccess(updatedSettings, res, 'Extra settings updated successfully');
    } catch (error) {
        setError(error, res);
    }
}