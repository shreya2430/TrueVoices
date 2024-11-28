import { getSettings, updateSettings } from '../services/extra-settings-service.js';
import { setSuccess, setError } from '../response-handler.js';

export async function getExtraSettings(req, res) {
    console.log("jjhhb");
    try {
        const { spaceId } = req.params;
        const settings = await getSettings(spaceId);
        return setSuccess(settings, res, "Extra settings fetched successfully");
    } catch (error) {
        return setError(error, res);
    }
}

export async function updateExtraSettings(req, res) {
    try {
        const { spaceId } = req.params;
        const updatedSettings = await updateSettings(spaceId, req.body);
        return setSuccess(updatedSettings, res, "Extra settings updated successfully");
    } catch (error) {
        setError(error, res);
    }
}