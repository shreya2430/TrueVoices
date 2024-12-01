import { Request, Response } from 'express';
import { updateThankYouPage } from '../services/thank-you-page-service'; 
import { setSuccess, setError } from '../response-handler'; 

/**
 * Update the Thank You Page for a specific space.
 *
 * @param req - request object containing the spaceId and update thank you page data body
 * @param res - response object for sending the response
 */
export async function updateThankYouPageForSpace(req: Request, res: Response): Promise<void> {
    try {
        const { spaceId } = req.params;
        if (!spaceId) {
            throw new Error('spaceId is required');
        }

        const updatedPage = await updateThankYouPage(spaceId, req.body);

        setSuccess(updatedPage, res, 'Thank you page updated successfully for space.');
    } catch (error) {
        setError(error, res);
    }
}