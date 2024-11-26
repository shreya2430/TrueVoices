import mongoose from "mongoose";

const EmailSettingsSchema = new mongoose.Schema({
  emailFrom: String,
  emailTo: String,
  subject: String,
  message: String
});

const EmailSettings = mongoose.model('EmailSettings', EmailSettingsSchema);

export default EmailSettings;