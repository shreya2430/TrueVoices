import ThankYouPage from '../models/thank-you-page.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import Space from '../models/spaces.js';

// Update the settings for a specific space
export async function updateThankYouPage(spaceId, updates) {
    const space = await Space.findOne({ spaceName: spaceId });
    if (!space) throw new NotFoundError(`Space with ID ${spaceId} does not exist`);
    const updatedThankYouPage = await ThankYouPage.findByIdAndUpdate(
         space.thankYouPage,  
        updates,     
        { new: true }  
    );

    if (!updatedThankYouPage) {
        throw new NotFoundError(`The spaceId ${spaceId} does not exist`);
    }

    return updatedThankYouPage; 
}