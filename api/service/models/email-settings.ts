import mongoose from "mongoose";
import { spaceService } from "../services/spaces";

const EmailSettingsSchema = new mongoose.Schema({
  emailFrom: String,
  emailTo: String,
  subject: String,
  message: String,
  spaceName: { type: String, required: true }
});

export type EmailSettingsType = mongoose.InferSchemaType<typeof EmailSettingsSchema> & mongoose.Document;
const EmailSettings = mongoose.model<EmailSettingsType>('EmailSettings', EmailSettingsSchema);


export default EmailSettings;