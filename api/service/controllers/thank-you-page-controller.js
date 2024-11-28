import { updateThankYouPage } from '../services/thank-you-page-service.js';
import { setSuccess, setError } from '../response-handler.js';

export async function updateThankYouPageForSpace(req, res) {
    try {
        const { spaceId } = req.params;
        const updatedPage = await updateThankYouPage(spaceId, req.body);
        return setSuccess(updatedPage, res, 'Thank you page updated successfully for space.');
    } catch (error) {
       return setError(error, res);
    }
}