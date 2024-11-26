import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv"; // Import dotenv for environment variables
import initializeRoutes from "./routers/index.js"; // Import main route initializer

dotenv.config(); // Load environment variables from .env file

const initialize = (app) => {
    // Apply middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Connect to MongoDB
    mongoose
        .connect(process.env.MONGO_CONNECTION)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Failed to connect to MongoDB", err));

    // Initialize all routes
    initializeRoutes(app);

     // Handle invalid routes
     app.use((req, res, next) => {
        res.status(404).send({ error: "Route not found" });
    });
};

export default initialize;
