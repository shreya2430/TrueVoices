import dotenv from 'dotenv';
import express from 'express';
import initialize from './service/app.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3003; // Use the PORT from .env or default to 3000


initialize(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});