import mongoose from 'mongoose'
import ExtraSettings, { ExtraSettingsType } from '../models/extra-settings.js'
import { TestimonialModel } from '../models/index.js'
import SpaceModel, { Space } from '../models/spaces'
import ThankYouPage, { ThankYouPageType } from '../models/thank-you-page.js'

/**
 *
 * @returns {Promise<Array<Space>>} - Array of spaces
 */
export const getSpaces = async (userId: string): Promise<Array<Omit<Space, "userId">>> => {
	try {
		const userIdObj = new mongoose.Types.ObjectId(userId)
		const spaces: Space[] = await SpaceModel.find({ userId: userIdObj })
			.select({ _id: 0, __v: 0, userId: 0 })
			.populate('thankYouPage', { _id: 0, __v: 0, spaceName: 0 })
			.populate('extraSettings', { _id: 0, __v: 0, spaceName: 0 })
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
const getSpaceByName = async (spaceName: string): Promise<Omit<Space, "userId">> => {
	try {
		const space: Space = await SpaceModel.findOne({ spaceName })
			.select({ _id: 0, __v: 0, userId: 0 })
			.populate('thankYouPage', { _id: 0, __v: 0, spaceName: 0 })
			.populate('extraSettings', { _id: 0, __v: 0, spaceName: 0 })
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
		let extraSettings: ExtraSettingsType, thankYouPage: ThankYouPageType
		const spaceExists = await SpaceModel.findOne({ spaceName: spaceData.spaceName, userId: spaceData.userId })
		if (spaceExists) {
			throw new Error(`space already exists with ${spaceData.spaceName}`)
		}
		extraSettings = await ExtraSettings.create({ ...spaceData.extraSettings, spaceName: spaceData.spaceName })
		thankYouPage = await ThankYouPage.create({ ...spaceData.thankYouPage, spaceName: spaceData.spaceName })
		const newSpace = new SpaceModel({
			...spaceData,
			extraSettings: extraSettings._id,
			thankYouPage: thankYouPage._id,
		})

		await newSpace.save({ validateBeforeSave: true })
		return spaceData
	} catch (error) {
		console.error('Error creating space:', error)
		throw new Error('Failed to create space: ' + error.message)
	}
}

/**
 * 
 * @param spaceData Space
 * @returns {Promise<Space>} - Promise<Space>
 */
const updateSpace = async (spaceData: Space): Promise<Space> => {
	try {
		let extraSettings: ExtraSettingsType, thankYouPage: ThankYouPageType
		const space = await SpaceModel.findOne({ spaceName: spaceData.spaceName })
		extraSettings = await ExtraSettings.findByIdAndUpdate(space.extraSettings._id, {...spaceData.extraSettings}, { new: true })
		thankYouPage = await ThankYouPage.findByIdAndUpdate(space.thankYouPage._id, {...spaceData.thankYouPage}, { new: true })

		const updatedSpace = await SpaceModel.findOneAndUpdate({
			spaceName: spaceData.spaceName,
		}, {
			...spaceData,
			extraSettings: extraSettings ? extraSettings._id : space.extraSettings,
			thankYouPage: thankYouPage ? thankYouPage._id : space.thankYouPage,
		}, { new: true })

		if (!updatedSpace) {
			throw new Error('Space not found')
		}

		return spaceData
	} catch (error) {
		console.error('Error updating space:', error)
		throw new Error('Failed to update space')
	}
}

/**
 * 
 * @param spaceName string
 * @returns {Promise<void>} - Promise<void>
 */
const deleteSpace = async (spaceName: string): Promise<void> => {
	try {
		const space = await SpaceModel.findOne({ spaceName })
		if (!space) {
			throw new Error('Space not found')
		}
		await ExtraSettings.findByIdAndDelete(space.extraSettings)
		await ThankYouPage.findByIdAndDelete(space.thankYouPage)
		await SpaceModel.findOneAndDelete({ spaceName })
		await TestimonialModel.deleteMany({ spaceName })
		return
	} catch (error) {
		console.error('Error deleting space:', error)
		throw new Error('Failed to delete space')
	}
}

export const spaceService = {
	getSpaces,
	getSpaceByName,
	createSpace,
	updateSpace,
	deleteSpace,
}
