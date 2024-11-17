import mongoose from "mongoose";
import cors from "cors";
import express from "express";

import intializeRoutes from "./routers/index.js";

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    mongoose.connect(process.env.MONGO_CONNECTION);

    intializeRoutes(app);

}
export default initialize;