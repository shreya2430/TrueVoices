import { uploadFile } from "../services/file";
import { Request, Response } from "express";

export const upload = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const path = req.url.split("/").slice(2).join("/");
    const sasUrl = await uploadFile(file, path);
    res.status(200).send(sasUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to upload file.");
  }
}