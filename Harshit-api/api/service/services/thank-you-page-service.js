import ThankYouPage from '../models/thank-you-page.js';
import NotFoundError from '../exceptions/NotFoundError.js';

// Update the settings for a specific space
export async function updateThankYouPage(spaceId, updates) {
    const updatedThankYouPage = await ThankYouPage.findOneAndUpdate(
        { spaceId },   // Filter by spaceId
        updates,       // Fields to update
        { new: true }   // Return the updated document, not the original one
    );

    if (!updatedThankYouPage) {
        throw new NotFoundError(`The spaceId ${spaceId} does not exist`);
    }

    return updatedThankYouPage; // Return the updated settings
}