import ThankYouPage, { IThankYouPage } from '../models/thank-you-page'; 
import Space from '../models/spaces'; 

/**
 * Update the Thank You Page settings for a specific space.
 *
 * @param spaceId - The ID or name of the space to update
 * @param updates - An object containing the fields to update
 * @returns {Promise<IThankYouPage | null>} - The updated Thank You Page document or null if not found
 */
export async function updateThankYouPage(spaceId: string, updates: Partial<IThankYouPage>): Promise<IThankYouPage | null> {
  if (!spaceId || spaceId.trim() === '') {
    throw new Error('spaceId cannot be empty');
  }

  try {
    const space = await Space.findOne({ spaceName: spaceId });
    if (!space) {
      throw new Error(`Space with ID "${spaceId}" not found`);
    }

    const updatedThankYouPage = await ThankYouPage.findByIdAndUpdate(
      space.thankYouPage,
      updates,
      { new: true, runValidators: true } 
    );

    return updatedThankYouPage;
  } catch (error) {
    console.error(`Error updating Thank You Page for space "${spaceId}":`, error);
    throw new Error(`Failed to update Thank You Page: ${error.message}`);
  }
}