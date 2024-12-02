import EmailSettings from '../models/email-settings.js'
import ExtraSettings from '../models/extra-settings.js'
import SpaceModel, { Space } from '../models/spaces'
import ThankYouPage from '../models/thank-you-page.js'

/**
 *
 * @returns {Promise<Array<Space>>} - Array of spaces
 */
export const getSpaces = async (): Promise<Array<Space>> => {
	try {
		const spaces: Space[] = await SpaceModel.find()
			.select({ _id: 0, __v: 0 })
			.populate('thankYouPage', { _id: 0, __v: 0 })
			.populate('extraSettings', { _id: 0, __v: 0 })
			.populate('emailSettings', { _id: 0, __v: 0 })
			.exec()
		return spaces
	} catch (error) {
		console.error('Error getting spaces:', error)
		throw new Error('Failed to retrieve spaces')
	}
}


/**
 * 
 * @param spaceName string
 * @returns {Promise<Space>} - Space object
 */
const getSpaceByName = async (spaceName: string): Promise<Space> => {
	try {
		const space: Space = await SpaceModel.findOne({ spaceName })
			.select({ _id: 0, __v: 0 })
			.populate('thankYouPage', { _id: 0, __v: 0 })
			.populate('extraSettings', { _id: 0, __v: 0 })
			.populate('emailSettings', { _id: 0, __v: 0 })
			.exec()
		if (!space) {
			throw new Error('Space not found')
		}
		return space
	} catch (error) {
		console.error('Error getting space:', error)
		throw new Error('Failed to retrieve space')
	}
}

/**
 * 
 * @param spaceData Space
 * @returns {Promise<Space>} - Promise<Space>
 */
const createSpace = async (spaceData: Space): Promise<Space> => {
	try {
		let extraSettings, thankYouPage, emailSettings
		const spaceExists = await SpaceModel.findOne({ spaceName: spaceData.spaceName })
		if (spaceExists) {
			throw new Error(`space already exists with ${spaceData.spaceName}`)
		}
		if (spaceData.extraSettings) {
			extraSettings = new ExtraSettings(spaceData.extraSettings)
			await extraSettings.save()
		}
		if (spaceData.thankYouPage) {
			thankYouPage = new ThankYouPage(spaceData.thankYouPage)
			await thankYouPage.save()
		}
		if (spaceData.emailSettings) {
			emailSettings = new EmailSettings(spaceData.emailSettings)
			await emailSettings.save()
		}
		const newSpace = new SpaceModel({
			...spaceData,
			extraSettings: extraSettings ? extraSettings._id : null,
			thankYouPage: thankYouPage ? thankYouPage._id : null,
			emailSettings: emailSettings ? emailSettings._id : null,
		})

		await newSpace.save({ validateBeforeSave: true })
		return spaceData
	} catch (error) {
		console.error('Error creating space:', error)
		throw new Error('Failed to create space: ' + error.message)
	}
}

export const spaceService = {
	getSpaces,
	getSpaceByName,
	createSpace,
}
