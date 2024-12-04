import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for the testimonial document
export interface ITestimonial extends Document {
  name: string;
  companyAndTitle: string;
  socialLinks: string[];
  address: string;
  testimonialType: string;
  content: string;
  profilePic: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the testimonial model
const testimonialSchema: Schema<ITestimonial> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    companyAndTitle: {
      type: String,
      required: [true, "Company and Title are required"],
      maxlength: [100, "Company and Title cannot exceed 100 characters"],
    },
    socialLinks: {
      type: [String],
      validate: {
        validator: function (links: string[]): boolean {
          return links.every((link) =>
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(link)
          );
        },
        message: "One or more social links are not valid URLs",
      },
      default: [],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [5, "Address must be at least 5 characters long"],
    },
    testimonialType: {
      type: String,
      required: [true, "Testimonial type is required"],
    },
    content: {
      type: String,
      required: [true, "Testimonial content is required"],
      minlength: [10, "Content must be at least 10 characters long"],
      maxlength: [500, "Content cannot exceed 500 characters"],
    },
    profilePic: {
      type: String,
      required: [true, "Profile picture URL is required"],
      validate: {
        validator: function (url: string): boolean {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
            url
          );
        },
        message: "Profile picture must be a valid URL",
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the Testimonial model
const Testimonial: Model<ITestimonial> = mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema
);

export default Testimonial;