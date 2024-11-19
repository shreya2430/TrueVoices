import EmailSettings from '../models/email-settings'
import ExtraSettings from '../models/extra-settings'
import Space from '../models/spaces'
import ThankYouPage from '../models/thank-you-page'

export const getSpaces = async () => {
  try {
    const spaces = await Space.find()
      .populate('thankYouPage')
      .populate('extraSettings')
      .populate('emailSettings')
      .exec()
    return spaces
  } catch (error) {
    console.error('Error getting spaces:', error)
    throw new Error('Failed to retrieve spaces')
  }
}

const getSpaceByName = async (spaceName) => {
	try {
		const space = await Space.findOne({ spaceName })
			.populate('thankYouPage')
			.populate('extraSettings')
      .populate('emailSettings')
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

const createSpace = async (spaceData) => {
  try {
    let extraSettings, thankYouPage, emailSettings
    if (spaceData.extraSettings) {
      extraSettings = new ExtraSettings(spaceData.extraSettings)
      await extraSettings.save()
    }
    if (spaceData.thankYouPage) {
      thankYouPage = await ThankYouPage(spaceData.thankYouPage)
      await thankYouPage.save()
    }
    if (spaceData.emailSettings) {
      emailSettings = new EmailSettings(spaceData.emailSettings)
      await emailSettings.save()
    }
    const space = new Space({
      ...spaceData,
      extraSettings: extraSettings ? extraSettings._id : null,
      thankYouPage: thankYouPage ? thankYouPage._id : null,
      emailSettings: emailSettings ? emailSettings._id : null
    })

    await space.save()
    return
  } catch (error) {
    console.error('Error creating space:', error)
    throw new Error('Failed to create space: ' + error.message)
  }
}