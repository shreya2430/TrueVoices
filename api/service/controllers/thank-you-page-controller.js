import { updateThankYouPage } from '../services/thank-you-page-service.js';
import { setSuccess, setError } from './response-handler.js';
import NotFoundError from '../exceptions/NotFoundError.js';

export async function updateThankYouPageForSpace(req, res) {
    try {
        const { spaceId } = req.params;
        const updatedPage = await updateThankYouPage(spaceId, req.body);
        setSuccess(updatedPage, res, 'Thank you page updated successfully for space.');
    } catch (error) {
        // Only attempt to send a response if one hasn't been sent already
        if (res.headersSent) {
            return; // Do nothing if headers are already sent
        }

        if (error instanceof NotFoundError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        } else {
            setError(error.message, res);  // Assuming `setError` handles general errors
        }
    }
}