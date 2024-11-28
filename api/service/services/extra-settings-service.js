import ExtraSettings from '../models/extra-settings.js';
import NotFoundError from '../exceptions/NotFoundError.js';
import Space from '../models/spaces.js';

// Fetch the settings for a specific space
export async function getSettings(spaceId) {
         if (!spaceId || spaceId.trim() === '') {
            throw new Error('spaceId cannot be empty');
        }
        const space = await Space.findOne({ spaceName: spaceId });
        if (!space) throw new Error(`space with id ${spaceId} not found`);
 
        const settings = await ExtraSettings.findById(space.extraSettings);
        return settings;
}

// Update the settings for a specific space
export async function updateSettings(spaceId, updates) {
          if (!spaceId || spaceId.trim() === '') {
            throw new Error('spaceId cannot be empty');
        }
         const space = await Space.findOne({ spaceName: spaceId });
        if (!space) throw new Error(`space with id ${spaceId} not found`);
        
        const updatedSettings = await ExtraSettings.findByIdAndUpdate(
        space.extraSettings,   
        updates,       
        { new: true }   
         );
    return updatedSettings; 
}