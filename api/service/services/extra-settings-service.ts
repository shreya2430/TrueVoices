import ExtraSettings, { IExtraSettings } from '../models/extra-settings';  // Import types
import Space from '../models/spaces';  // Assuming ISpace interface exists


/**
 * Get the settings for a specific space
 * @param spaceId string
 * @returns {Promise<IExtraSettings | null>} - Extra settings object
 */
export async function getSettings(spaceId: string): Promise<IExtraSettings | null> {
  if (!spaceId || spaceId.trim() === '') {
    throw new Error('spaceId cannot be empty');
  }

  const space = await Space.findOne({ spaceName: spaceId });
  if (!space) {
    throw new Error(`Space with id ${spaceId} not found`);
  }

  const settings: IExtraSettings | null = await ExtraSettings.findById(space.extraSettings);
  if (!settings) {
    throw new Error(`Settings for space ${spaceId} not found`);
  }

  return settings;
}

/**
 *  Update the settings for a specific space
 * @param spaceId string
 * @returns {Promise<IExtraSettings | null>} - Extra settings object
 */
export async function updateSettings(spaceId: string, updates: Partial<IExtraSettings>): Promise<IExtraSettings | null> {

  if (!spaceId || spaceId.trim() === '') {
    throw new Error('spaceId cannot be empty');
  }

  const space = await Space.findOne({ spaceName: spaceId });
  if (!space) {
    throw new Error(`Space with id ${spaceId} not found`);
  }

  const updatedSettings: IExtraSettings | null = await ExtraSettings.findByIdAndUpdate(
    space.extraSettings,
    updates,
    { new: true, runValidators: true } 
  );

  if (!updatedSettings) {
    throw new Error(`Failed to update settings for space ${spaceId}`);
  }

  return updatedSettings;
}