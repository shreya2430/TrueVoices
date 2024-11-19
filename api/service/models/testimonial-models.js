import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyAndTitle: { type: String, required: true },
    socialLinks: { type: [String], default: [] },
    address: { type: String, required: true },
    testimonialType: { type: String, required: true },
    content: { type: String, required: true },
    profilePic: { type: String, required: true },
  }, { timestamps: true });

// Create the Testimonial model
const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
