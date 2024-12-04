import mongoose from 'mongoose'
import cors from 'cors'
import express, { Express } from 'express'
import dotenv from 'dotenv' // Import dotenv for environment variables
import initializeRoutes from './routers/index' // Import main route initializer
import { generateRandomPfp } from './utils/generate-random-pfp'

dotenv.config() // Load environment variables from .env file

const initialize = (app: Express) => {
	// Apply middleware
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	// Connect to MongoDB
	mongoose
		.connect(process.env.MONGO_CONNECTION || '')
		.then(() => console.log('Connected to MongoDB'))
		.catch((err) => console.error('Failed to connect to MongoDB', err))

	generateRandomPfp()
	// Initialize all routes
	initializeRoutes(app)

	// Handle invalid routes
	app.use((_, res) => {
		res.status(404).send({ error: 'Route not found' })
	})
}

export default initialize
