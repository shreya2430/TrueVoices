import mongoose from "mongoose";

const EmailSettingsSchema = new mongoose.Schema({
  emailFrom: String,
  emailTo: String,
  subject: String,
  message: String,
});

export type EmailSettingsType = mongoose.InferSchemaType<typeof EmailSettingsSchema> & mongoose.Document;
const EmailSettings = mongoose.model<EmailSettingsType>('EmailSettings', EmailSettingsSchema);


export default EmailSettings;