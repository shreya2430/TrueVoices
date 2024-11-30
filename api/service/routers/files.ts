import { Router } from "express";
import { upload as uploadController } from "../controllers/file";
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const filesRouter = Router();

filesRouter.post("/:spaceName/:filetype", upload.single("file"), uploadController);