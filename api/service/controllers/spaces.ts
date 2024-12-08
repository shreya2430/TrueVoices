import { spaceService } from '../services/spaces.js'
import { Request, Response } from 'express'

const post = async (req: Request, res: Response) => {
	try {
		const data = req.body
		console.log(req.user)
		const space = await spaceService.createSpace({ ...data })
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

const getById = async (req: Request, res: Response) => {
	try {
		const space = await spaceService.getSpaceByName(req.params.spaceName)
		res.status(200).json(space)
	} catch (error) {
		if (error.message === 'Space not found') {
			res.status(404).json({ message: error.message })
		} else {
			res.status(500).json({ message: error.message })
		}
	}
}

const get = async (req: Request, res: Response) => {
	try {
		const { userId } = req.query
		console.log(userId)
		const spaces = await spaceService.getSpaces(userId || '')
		res.status(200).json(spaces)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const update = async (req: Request, res: Response) => {
	try {
		const data = req.body
		const space = await spaceService.updateSpace({ ...data })
		res.status(200).json(space)
	} catch (error) {
		if (error.message === 'Space not found') {
			res.status(404).json({ message: error.message })
		} else {
			res.status(500).json({ message: error.message })
		}
	}
}

const deleteSpace = async (req: Request, res: Response) => {
	try {
		await spaceService.deleteSpace(req.params.spaceName)
		res.status(204).end()
	} catch (error) {
		if (error.message === 'Space not found') {
			res.status(404).json({ message: error.message })
		} else {
			res.status(500).json({ message: error.message })
		}
	}
}

export const spacesController = {
	post,
	getById,
	get,
	update,
	deleteSpace,
}
