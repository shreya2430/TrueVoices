import ExtraSettings from '../models/extra-settings.js';
import NotFoundError from '../exceptions/NotFoundError.js';

// Fetch the settings for a specific space
export async function getSettings(spaceId) {
    const settings = await ExtraSettings.findOne({ spaceId });
    if (!settings) throw new NotFoundError(`The spaceId ${spaceId} does not exist`); 
    return settings;
}

// Update the settings for a specific space
export async function updateSettings(spaceId, updates) {
    const updatedSettings = await ExtraSettings.findOneAndUpdate(
        { spaceId },   // Filter by spaceId
        updates,       // Fields to update
        { new: true }   // Return the updated document, not the original one
    );

    if (!updatedSettings) {
        throw new Error(`The spaceId ${spaceId} does not exist`); 
    }

    return updatedSettings; // Return the updated settings
}