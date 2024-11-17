import { getSettings, updateSettings } from '../services/extra-settings-service.js';
import { setSuccess, setError } from './response-handler.js';
import NotFoundError from '../exceptions/NotFoundError.js';


export async function getExtraSettings(req, res) {
    try {
        const { spaceId } = req.params;
        const settings = await getSettings(spaceId);
        setSuccess(settings, res);
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

export async function updateExtraSettings(req, res) {
    try {
        const { spaceId } = req.params;
        const updatedSettings = await updateSettings(spaceId, req.body);
        setSuccess(updatedSettings, res);
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