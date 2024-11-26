import ExtraSettings from '../models/extra-settings.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import Space from '../models/spaces.js';

// Fetch the settings for a specific space
export async function getSettings(spaceId) {
    const space = await Space.findOne({ spaceName: spaceId });
    if (!space) throw new NotFoundError(`The space ${spaceId} does not exist`);
    const settings = await ExtraSettings.findById(space.extraSettings);
    // const settings = await ExtraSettings.findOne({ spaceId });
    if (!settings) throw new NotFoundError(`The space ${spaceId} does not exist`);
    return settings;
}

// Update the settings for a specific space
export async function updateSettings(spaceId, updates) {
    const space = await Space.findOne({ spaceName: spaceId });
    if (!space) throw new NotFoundError(`The space ${spaceId} does not exist`);
    const updatedSettings = await ExtraSettings.findByIdAndUpdate(
        space.extraSettings,   // Filter by the extraSettings id
        updates,       // Fields to update
        { new: true }   // Return the updated document, not the original one
    );

    if (!updatedSettings) {
        throw new NotFoundError(`The space ${spaceId} does not exist`);
    }

    return updatedSettings; // Return the updated settings
}