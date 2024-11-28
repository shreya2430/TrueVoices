import dotenv from 'dotenv'
import express from 'express'
import initialize from './service/app'

// Load environment variables from .env file
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
// Initialize middleware, routes, etc.
initialize(app)

// Define a root route for testing
app.get('/', (_, res) => {
	res.send('Welcome to the Testimonials API!')
})

// Start the server
app.listen(port, () => {
	console.log(`Listening to port ${port}`)
})
