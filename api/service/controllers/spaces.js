import { spaceService } from "../services/spaces.js"

const post = async (req, res) => {
  try {
    const data = req.body
    const space = await spaceService.createSpace(data)
    res.status(201).json(space)
  } catch (error) {
    if (
			error.message.includes('duplicate key error') ||
			error.message.includes('space already exists')
		) {
			res.status(409).json({ message: 'Space name already exists' })
		} else if (error.message.includes('validation failed')) {
			res.status(400).json({ message: error.message })
		} else {
			res.status(500).json({ message: error.message })
		}
  }
}

const getById = async (req, res) => {
  try {
    const space = await spaceService.getSpaceByName(req.params.spaceName)
    res.status(200).json(space)
  } catch (error) {
    if (error.message === 'Space not found') {
      return res.status(404).json({ message: error.message })
    } else {
      return res.status(500).json({ message: error.message })
    }
  }
}

const get = async (req, res) => {
  try {
    const spaces = await spaceService.getSpaces()
    res.status(200).json(spaces)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const spacesController = {
  post,
  getById,
  get
}