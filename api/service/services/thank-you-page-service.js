import ThankYouPage from '../models/thank-you-page.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import Space from '../models/spaces.js';

// Update the settings for a specific space
export async function updateThankYouPage(spaceId, updates) {
    if(spaceId === undefined || spaceId.trim() === '') {
        throw new Error('spaceId cannot be empty');
    }
    const space = await Space.findOne({ spaceName: spaceId });
     if (!space) throw new Error(`space with id ${spaceId} not found`);
    const updatedThankYouPage = await ThankYouPage.findByIdAndUpdate(
         space.thankYouPage,  
        updates,     
        { new: true }  
    );
    return updatedThankYouPage; 
}