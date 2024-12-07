import { fileService } from "../services/file";
import { Request, Response } from "express";

export const upload = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const path = req.url.split("/").slice(1).join("/");
    console.log(path);
    const sasUrl = await fileService.uploadFile(file, path);
    res.status(200).json({ url: sasUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to upload file.");
  }
}